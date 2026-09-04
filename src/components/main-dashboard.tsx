import { useState } from 'react';
import { useStatusQuery } from '../api/use-status-query';
import { ApiError } from '../api/api';
import { getTime } from '../helpers';

export const MainDashboard = () => {
  const [errorText, setErrorText] = useState<string | null>(null);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [lastCheckTime, setLastCheckTime] = useState<Date | null>(null);

  const { data: apiStatus, isLoading: isStatusLoading, isRefetching, refetch } = useStatusQuery();

  const handleCheck = async () => {
    setErrorText(null);
    const result = await refetch();

    if (result.isError) {
      const error = result.error;
      if (error instanceof ApiError) {
        if (error.status === 429) {
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

  const isLoading = isStatusLoading || isRefetching;

  return (
    <div className="p-3 dcol gap-3 as js col-12 col-sm-8 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
      <span className="fs-1">Parcoin App</span>
      <div className="dcol gap-3 js astr bg-light border rounded-4 p-3 w-100">
        <div className="drow jb ac text-secondary">
          <span>Статус сервисов</span>
          {lastCheckTime && <span>обновлено {getTime(lastCheckTime)}</span>}
        </div>

        {!isLoading && errorText && <div className="alert alert-danger m-0">{errorText}</div>}
        {!errorText && (
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
