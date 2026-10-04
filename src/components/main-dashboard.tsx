import { useState, type FormEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { StatusQueryKey, useStatusQuery, type StatusPayment } from '../api/use-status-query';
import { ApiError } from '../api/api';
import { useAdminStore } from '../store/admin-store';
import { formatRub, getCancellationReason, getTime, getTimeWithSeconds } from '../helpers';

type View = 'services' | 'payments';

export const MainDashboard = () => {
  const [errorText, setErrorText] = useState<string | null>(null);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [lastCheckTime, setLastCheckTime] = useState<Date | null>(null);
  const [view, setView] = useState<View>('services');

  const adminPassword = useAdminStore((state) => state.adminPassword);
  const setAdminPassword = useAdminStore((state) => state.setAdminPassword);
  const logout = useAdminStore((state) => state.logout);

  const queryClient = useQueryClient();
  const { data: apiStatus, isLoading: isStatusLoading, isRefetching, refetch } = useStatusQuery();

  const handleLogout = (message: string | null = null) => {
    logout();
    queryClient.removeQueries({ queryKey: [StatusQueryKey] });
    setIsFirst(true);
    setLastCheckTime(null);
    setView('services');
    setErrorText(message);
  };

  const handleCheck = async () => {
    setErrorText(null);
    const result = await refetch();

    if (result.isError) {
      const error = result.error;
      if (error instanceof ApiError) {
        if (error.status === 401) {
          handleLogout('Неверный пароль');
          return;
        } else if (error.status === 429) {
          setErrorText('Слишком много запросов подряд, подождите 1 минуту');
        } else if (error.status >= 500) {
          setErrorText('Сервер вернул ошибку, попробуйте позже');
        } else {
          setErrorText(`Ошибка запроса: ${error.status}`);
        }
      } else {
        // fetch вообще не смог достучаться — сеть, CORS, сервер лежит
        setErrorText('Основной сервер недоступен');
      }
    }

    setLastCheckTime(new Date());
    setIsFirst(false);
  };

  const handleLogin = (password: string) => {
    // пароль попадает в стор синхронно, поэтому запрос сразу уйдёт с ним
    setAdminPassword(password);
    handleCheck();
  };

  const isLoading = isStatusLoading || isRefetching;

  if (!adminPassword) {
    return <LoginForm errorText={errorText} onLogin={handleLogin} />;
  }

  const payments = apiStatus?.payments ?? [];

  return (
    <div
      className={`p-3 dcol gap-3 as js col-12 ${view === 'payments' ? 'col-lg-8 col-xl-6' : 'col-sm-8 col-md-6 col-lg-6 col-xl-4 col-xxl-4'}`}
    >
      <div className="drow jb ac w-100">
        <span className="fs-1">Parcoin App</span>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => handleLogout()}>
          Выйти
        </button>
      </div>

      <div className="btn-group w-100" role="group">
        <button
          className={`btn ${view === 'services' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setView('services')}
        >
          Доступность
        </button>
        <button
          className={`btn ${view === 'payments' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setView('payments')}
        >
          Платежи{!isFirst && !errorText ? ` (${payments.length})` : ''}
        </button>
      </div>

      <div className="dcol gap-3 js astr bg-light border rounded-4 p-3 w-100">
        <div className="drow jb ac text-secondary">
          <span>{view === 'services' ? 'Статус сервисов' : 'Платежи за последние 10 минут'}</span>
          {lastCheckTime && <span>обновлено {getTime(lastCheckTime)}</span>}
        </div>

        {!isLoading && errorText && <div className="alert alert-danger m-0">{errorText}</div>}
        {!errorText && view === 'services' && (
          <div className="dcol js astr">
            <Service
              label="RPS"
              description="Парковка Заводская"
              isOnline={apiStatus?.rps ?? false}
              isLoading={isLoading}
              isFirst={isFirst}
            />
            <Service
              label="Ecopark"
              description="Парковка Аэропорт"
              isOnline={apiStatus?.ecopark ?? false}
              isLoading={isLoading}
              isFirst={isFirst}
            />
            <Service
              label="CleverPark"
              description="Парковка Квант"
              isOnline={apiStatus?.cleverPark ?? false}
              isLoading={isLoading}
              isFirst={isFirst}
            />
            <Service
              label="Юкасса"
              description="Платежный шлюз"
              isOnline={apiStatus?.yookassa ?? false}
              isLoading={isLoading}
              isFirst={isFirst}
            />
            <Service
              label="База данных"
              description="Внутренняя инфраструктура"
              isOnline={apiStatus?.db ?? false}
              isLoading={isLoading}
              isFirst={isFirst}
            />
          </div>
        )}
        {!errorText && view === 'payments' && (
          <PaymentList payments={payments} isLoading={isLoading} isFirst={isFirst} />
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleCheck();
          }}
          disabled={isLoading}
          className={`btn btn-primary rounded-3 px-4 w-50 align-self-end`}
        >
          {isLoading ? 'Обновляем' : 'Обновить'}
        </button>
      </div>
    </div>
  );
};

interface LoginFormProps {
  errorText: string | null;
  onLogin: (password: string) => void;
}

const LoginForm = ({ errorText, onLogin }: LoginFormProps) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = password.trim();
    if (value) {
      onLogin(value);
    }
  };

  return (
    <div className="p-3 dcol gap-3 as js col-12 col-sm-8 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
      <span className="fs-1">Parcoin App</span>
      <form
        onSubmit={handleSubmit}
        className="dcol gap-3 js astr bg-light border rounded-4 p-3 w-100"
      >
        <span className="text-secondary">Вход для администратора</span>
        {errorText && <div className="alert alert-danger m-0">{errorText}</div>}
        <input
          type="password"
          className="form-control"
          placeholder="Пароль"
          autoComplete="current-password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={!password.trim()}
          className="btn btn-primary rounded-3 px-4 w-50 align-self-end"
        >
          Войти
        </button>
      </form>
    </div>
  );
};

interface PaymentListProps {
  payments: StatusPayment[];
  isLoading: boolean;
  isFirst: boolean;
}

const PaymentList = ({ payments, isLoading, isFirst }: PaymentListProps) => {
  if (isLoading) {
    return (
      <div className="drow jc py-3">
        <div className="spinner-border text-secondary" role="status"></div>
      </div>
    );
  }
  if (isFirst) {
    return null;
  }
  if (payments.length === 0) {
    return <div className="text-secondary text-center py-3">Платежей за последние 10 минут нет</div>;
  }
  return (
    <div className="dcol js astr gap-2">
      {payments.map((payment) => (
        <PaymentItem key={payment.orderId} payment={payment} />
      ))}
    </div>
  );
};

const PaymentItem = ({ payment }: { payment: StatusPayment }) => {
  const time = payment.paidAt ?? payment.createdAt;

  return (
    <div className={`alert alert-${payment.severity} rounded-3 px-3 py-2 m-0 dcol gap-1`}>
      <div className="drow jb ac gap-2">
        <span style={{ fontSize: '18px' }}>{payment.parking ?? 'Парковка не определена'}</span>
        <span className={`badge text-bg-${payment.severity}`}>{payment.statusLabel}</span>
      </div>
      <div className="drow jb ac gap-2" style={{ fontSize: '14px' }}>
        <span>Билет {payment.ticketCode ?? '—'}</span>
        <span className="fw-semibold">{formatRub(payment.amountRub)}</span>
      </div>
      <span style={{ fontSize: '14px' }}>{payment.state}</span>
      {payment.cancellationReason && (
        <span style={{ fontSize: '14px' }}>
          Причина: {getCancellationReason(payment.cancellationReason)}
        </span>
      )}
      {payment.lastDeliveryError && (
        <span style={{ fontSize: '14px' }}>
          Ошибка доставки в парковку: {payment.lastDeliveryError}
          {payment.nextDeliveryAt &&
            `, следующая попытка в ${getTimeWithSeconds(new Date(payment.nextDeliveryAt))}`}
        </span>
      )}
      <span className="text-secondary" style={{ fontSize: '12px' }}>
        {time ? getTimeWithSeconds(new Date(time)) : '—'} · заказ {payment.orderId}
        {payment.yooKassaId && ` · ЮKassa ${payment.yooKassaId}`}
      </span>
    </div>
  );
};

interface ServiceProps {
  label: string;
  description: string;
  isOnline: boolean;
  isLoading: boolean;
  isFirst: boolean;
}

const Service = ({ label, description, isOnline, isLoading, isFirst }: ServiceProps) => {
  const active = 'rgb(64, 193, 94)';
  const inActive = 'rgb(255, 85, 85)';
  const spinner = 'rgb(192, 192, 192)';

  const isSecondary = isLoading || isFirst;
  const isSuccess = !isLoading && !isFirst && isOnline;

  return (
    <div
      className={`drow jb ac alert  ${isSecondary ? 'alert-secondary' : isSuccess ? 'alert-success' : 'alert-danger'} rounded-3 px-3 py-2 gap-5`}
    >
      <div className="dcol js as">
        <span style={{ fontSize: '18px' }}>{label}</span>
        <span style={{ fontSize: '14px' }} className="text-secondary">
          {description}
        </span>
      </div>
      <div>
        {isLoading ? (
          <div
            style={{ height: '15px', width: '15px', color: spinner }}
            className="spinner-grow"
          ></div>
        ) : (
          <span style={{ fontSize: '14px', color: isOnline ? active : inActive }}>
            {!isFirst ? (isOnline ? 'Доступно' : 'Недоступно') : ''}
          </span>
        )}
      </div>
    </div>
  );
};
