import { useState } from 'react';
import { useStatusQuery } from '../api/use-status-query';

export const MainDashboard = () => {
  const [errorText, setErrorText] = useState<string | null>(null);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [lastCheckTime, setLastCheckTime] = useState<Date | null>(null);

  const { data: apiStatus, isLoading: isStatusLoading, isRefetching, refetch } = useStatusQuery();

  const isLoading = isStatusLoading || isRefetching;

  const handleCheck = async () => {
    setErrorText(null);
    const result = await refetch();

    if (result.isError) {
      setErrorText('Основной сервер недоступен');
    }
    setLastCheckTime(new Date());
    setIsFirst(false);
  };
  return (
    <div className="p-3 dcol gap-3 as js col-12 col-md-8 col-lg-6 container">
      <span className="fw-semibold fs-4">Parcoin</span>
      <div className="dcol gap-3 js astr bg-light border rounded-4 p-3 w-100">
        <span className="text-secondary">Статус сервисов</span>

        <div className="dcol gap-3 js astr">
          {!isLoading && errorText && <div className="alert alert-danger m-0">{errorText}</div>}

          {!errorText && (
            <>
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
            </>
          )}
        </div>

        {lastCheckTime && (
          <span style={{ fontSize: '12px' }}>
            Последняя проверка{' '}
            {lastCheckTime.toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleCheck();
          }}
          disabled={isLoading}
          className="btn btn-success px-4 rounded-4"
        >
          {isLoading ? 'Обновляем...' : 'Обновить'}
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

  return (
    <div className="drow jb ac bg-white border rounded-3 px-3 py-2 gap-5">
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
