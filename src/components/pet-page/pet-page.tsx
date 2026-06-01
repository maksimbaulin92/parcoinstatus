import { useState } from 'react';
import type { Pet, PetGender, PetType } from '../../lib/types';
import { genderLabels, mockPet, petTypeLabels } from '../../lib/data';
import { calcAge } from '../../lib/helpers';
import { useNavigate } from 'react-router-dom';
import './style.css';

export const PetCard = () => {
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet>(mockPet);
  const [isEditing, setIsEditing] = useState(false);
  const [isNotesEditing, setIsNotesEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'weight' | 'notes'>('info');
  const [form, setForm] = useState({
    name: pet.name,
    type: pet.type,
    breed: pet.breed,
    gender: pet.gender,
    birthDate: pet.birthDate,
    color: pet.color,
    chipNumber: pet.chipNumber,
    notes: pet.notes,
  });
  const [newWeight, setNewWeight] = useState('');

  const handleSave = () => {
    setPet((prev) => ({ ...prev, ...form }));
    setIsNotesEditing(false);
    setIsEditing(false);
  };

  const handleAddWeight = () => {
    const val = parseFloat(newWeight);
    if (!val) return;
    const date = new Date().toISOString().slice(0, 7);
    setPet((prev) => ({
      ...prev,
      weightHistory: [...prev.weightHistory, { date, value: val }],
    }));
    setNewWeight('');
  };

  const lastWeight = pet.weightHistory.at(-1);
  const prevWeight = pet.weightHistory.at(-2);
  const weightDiff =
    lastWeight && prevWeight ? (lastWeight.value - prevWeight.value).toFixed(1) : null;

  return (
    <div className="container" style={{ maxWidth: 430 }}>
      {/* Header */}
      <div className="pet-card__header">
        <div className="pet-card__header-left">
          <button disabled={isEditing} onClick={() => navigate('/')} className="pet-card__back-btn">
            ← Назад
          </button>
          <span className="pet-card__header-title">{pet.name}</span>
        </div>
        {activeTab === 'info' && (
          <button
            className={`pet-card__edit-btn ${isEditing ? 'pet-card__edit-btn--cancel' : ''}`}
            onClick={() => setIsEditing((v) => !v)}
          >
            {isEditing ? 'Отмена' : 'Изменить'}
          </button>
        )}
      </div>

      {/* Avatar block */}
      <div className="pet-card__avatar-block">
        <div className="pet-card__avatar-wrap">
          <img src={pet.avatarUrl} alt={pet.name} className="pet-card__avatar" />
          {isEditing && <button className="pet-card__avatar-edit-btn">✏️</button>}
        </div>
        <div>
          <div className="pet-card__pet-name">{pet.name}</div>
          <div className="pet-card__pet-sub">
            {petTypeLabels[pet.type]} · {pet.breed}
          </div>
          <div className="pet-card__badges">
            <span className="pet-card__badge">{calcAge(pet.birthDate)}</span>
            <span className="pet-card__badge">{genderLabels[pet.gender]}</span>
            {lastWeight && (
              <span className="pet-card__badge">
                {lastWeight.value} кг
                {weightDiff && (
                  <span
                    className={
                      parseFloat(weightDiff) > 0 ? 'pet-card__badge--alert' : 'pet-card__badge--ok'
                    }
                  >
                    {' '}
                    {parseFloat(weightDiff) > 0 ? '+' : ''}
                    {weightDiff}
                  </span>
                )}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="pet-card__tabs">
        {(['info', 'weight', 'notes'] as const).map((tab) => (
          <button
            key={tab}
            className={`pet-card__tab ${activeTab === tab ? 'pet-card__tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
            disabled={isEditing && tab !== 'info'}
          >
            {tab === 'info' ? 'Данные' : tab === 'weight' ? 'Вес' : 'Заметки'}
          </button>
        ))}
      </div>

      {/* Tab: Info */}
      {activeTab === 'info' && (
        <div className="pet-card__section">
          {isEditing ? (
            <div className="pet-card__form">
              {[
                { label: 'Кличка', key: 'name', type: 'text' },
                { label: 'Порода', key: 'breed', type: 'text' },
                { label: 'Дата рождения', key: 'birthDate', type: 'date' },
                { label: 'Окрас', key: 'color', type: 'text' },
                { label: 'Номер чипа', key: 'chipNumber', type: 'text' },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <div className="pet-card__form-label">{label}</div>
                  <input
                    className="pet-card__form-input"
                    type={type}
                    value={form[key as keyof typeof form] as string}
                    onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                  />
                </div>
              ))}
              <div>
                <div className="pet-card__form-label">Тип</div>
                <select
                  className="pet-card__form-select"
                  value={form.type}
                  onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as PetType }))}
                >
                  {Object.entries(petTypeLabels).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="pet-card__form-label">Пол</div>
                <select
                  className="pet-card__form-select"
                  value={form.gender}
                  onChange={(e) => setForm((p) => ({ ...p, gender: e.target.value as PetGender }))}
                >
                  <option value="male">Мальчик</option>
                  <option value="female">Девочка</option>
                </select>
              </div>
              <button className="pet-card__save-btn" onClick={handleSave}>
                Сохранить
              </button>
              <button className="pet-card__action-btn">Архивировать</button>
              <button className="pet-card__action-btn pet-card__action-btn--danger">
                Удалить карточку
              </button>
            </div>
          ) : (
            <>
              {[
                { label: 'Тип', value: petTypeLabels[pet.type] },
                { label: 'Порода', value: pet.breed },
                { label: 'Пол', value: genderLabels[pet.gender] },
                {
                  label: 'Дата рождения',
                  value: new Date(pet.birthDate).toLocaleDateString('ru-RU'),
                },
                { label: 'Возраст', value: calcAge(pet.birthDate) },
                { label: 'Окрас', value: pet.color },
                { label: 'Номер чипа', value: pet.chipNumber || '—' },
              ].map(({ label, value }) => (
                <div key={label} className="pet-card__row">
                  <span className="pet-card__row-label">{label}</span>
                  <span className="pet-card__row-value">{value}</span>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* Tab: Weight */}
      {activeTab === 'weight' && (
        <div className="pet-card__section">
          <div className="pet-card__section-header">История веса</div>
          {[...pet.weightHistory].reverse().map((entry, i) => {
            const prev = [...pet.weightHistory].reverse()[i + 1];
            const diff = prev ? (entry.value - prev.value).toFixed(1) : null;
            return (
              <div key={entry.date} className="pet-card__row">
                <span className="pet-card__row-label">{entry.date}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {diff && (
                    <span
                      className={
                        parseFloat(diff) > 0
                          ? 'pet-card__weight-diff--up'
                          : 'pet-card__weight-diff--down'
                      }
                    >
                      {parseFloat(diff) > 0 ? '▲' : '▼'} {Math.abs(parseFloat(diff))}
                    </span>
                  )}
                  <span className="pet-card__row-value">{entry.value} кг</span>
                </div>
              </div>
            );
          })}
          <div className="pet-card__weight-footer">
            <input
              className="pet-card__weight-input"
              type="number"
              step="0.1"
              placeholder="Новый вес, кг"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
            />
            <button className="pet-card__weight-add-btn" onClick={handleAddWeight}>
              +
            </button>
          </div>
        </div>
      )}

      {/* Tab: Notes */}
      {activeTab === 'notes' && (
        <div className="pet-card__section">
          {isNotesEditing ? (
            <>
              <div style={{ padding: '14px 16px 8px' }}>
                <textarea
                  className="pet-card__notes-textarea"
                  rows={5}
                  value={form.notes}
                  onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                />
              </div>
              <div className="pet-card__notes-actions">
                <button className="pet-card__notes-save-btn" onClick={handleSave}>
                  Сохранить
                </button>
                <button
                  className="pet-card__notes-cancel-btn"
                  onClick={() => setIsNotesEditing(false)}
                >
                  Отмена
                </button>
              </div>
            </>
          ) : (
            <>
              {pet.notes ? (
                <p className="pet-card__notes-text">{pet.notes}</p>
              ) : (
                <p className="pet-card__notes-empty">Заметок нет</p>
              )}
              <button className="pet-card__notes-edit-btn" onClick={() => setIsNotesEditing(true)}>
                Редактировать
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
