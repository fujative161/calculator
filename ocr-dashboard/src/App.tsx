import { useEffect, useMemo, useState } from 'react'

type RequisiteType = 'card' | 'sbp'

interface RequisiteSetting {
  id: RequisiteType
  label: string
  enabled: boolean
  minAmount?: number | ''
}

interface OcrSettingsState {
  currency: 'RUB' | 'USD' | 'EUR'
  requisites: Record<RequisiteType, RequisiteSetting>
}

const defaultState: OcrSettingsState = {
  currency: 'RUB',
  requisites: {
    card: { id: 'card', label: 'Перевод на карту', enabled: false, minAmount: 10000 },
    sbp: { id: 'sbp', label: 'СБП', enabled: false, minAmount: '' },
  },
}

function App() {
  const [state, setState] = useState<OcrSettingsState>(() => {
    const saved = localStorage.getItem('ocr-settings')
    if (saved) {
      try {
        return JSON.parse(saved) as OcrSettingsState
      } catch (_) {
        /* ignore */
      }
    }
    return defaultState
  })

  const [isSaving, setIsSaving] = useState(false)
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    localStorage.setItem('ocr-settings', JSON.stringify(state))
  }, [state])

  const validationErrors = useMemo(() => {
    const errors: string[] = []
    const { requisites } = state

    ;(['card', 'sbp'] as const).forEach((key) => {
      const r = requisites[key]
      if (r.enabled) {
        if (r.minAmount === '' || r.minAmount === undefined || Number(r.minAmount) <= 0) {
          errors.push(`Укажите минимальную сумму для «${r.label}»`)
        }
      }
    })

    return errors
  }, [state])

  const handleToggle = (id: RequisiteType, enabled: boolean) => {
    setTouched(true)
    setState((prev) => ({
      ...prev,
      requisites: {
        ...prev.requisites,
        [id]: { ...prev.requisites[id], enabled },
      },
    }))
  }

  const handleAmountChange = (id: RequisiteType, value: string) => {
    setTouched(true)
    const numeric = value === '' ? '' : Number(value.replace(/[^0-9]/g, ''))
    setState((prev) => ({
      ...prev,
      requisites: {
        ...prev.requisites,
        [id]: { ...prev.requisites[id], minAmount: numeric as number | '' },
      },
    }))
  }

  const handleCurrencyChange = (value: OcrSettingsState['currency']) => {
    setTouched(true)
    setState((prev) => ({ ...prev, currency: value }))
  }

  const handleCancel = () => {
    setState(defaultState)
    setTouched(false)
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 600))
    setIsSaving(false)
    setTouched(false)
    alert('Настройки сохранены')
  }

  const canSave = validationErrors.length === 0 && touched && !isSaving

  return (
    <div className="app-root">
      <aside className="sidebar">
        <div className="sidebar-brand">Dashboard</div>
        <nav className="sidebar-nav">
          <a className="nav-item" href="#">Выводы</a>
          <a className="nav-item" href="#">Работа с транзакциями</a>
          <a className="nav-item" href="#">Депозиты</a>
          <a className="nav-item" href="#">Проверка блокировок</a>
          <a className="nav-item" href="#">Алерты</a>
          <div className="nav-section">Настройки</div>
          <a className="nav-item" href="#">Пользователи</a>
          <a className="nav-item" href="#">Собственные карты</a>
          <a className="nav-item" href="#">Банки</a>
          <a className="nav-item" href="#">Методы</a>
          <a className="nav-item" href="#">Журнал операций</a>
          <a className="nav-item active" href="#">OCR</a>
        </nav>
      </aside>

      <main className="content">
        <header className="page-header">Редактирование настроек OCR</header>

        <section className="card">
          <div className="field-grid single">
            <label className="label" htmlFor="currency">Валюта</label>
            <select
              id="currency"
              className="select"
              value={state.currency}
              onChange={(e) => handleCurrencyChange(e.target.value as OcrSettingsState['currency'])}
            >
              <option value="RUB">RUB</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        </section>

        <section className="card">
          <div className="table">
            <div className="table-header">
              <div className="th">Тип реквизитов</div>
              <div className="th">Отправка чеков на ручную верификацию операторов</div>
              <div className="th">Минимальная сумма ручной проверки</div>
            </div>

            {(['card', 'sbp'] as const).map((id) => {
              const item = state.requisites[id]
              return (
                <div className="table-row" key={id}>
                  <div className="td td-title">{item.label}</div>
                  <div className="td">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={item.enabled}
                        onChange={(e) => handleToggle(id, e.target.checked)}
                      />
                      <span className="slider" />
                      <span className="switch-label">Включить</span>
                    </label>
                  </div>
                  <div className="td">
                    <input
                      type="text"
                      inputMode="numeric"
                      className="input"
                      placeholder="Введите сумму"
                      value={item.minAmount === '' ? '' : String(item.minAmount)}
                      onChange={(e) => handleAmountChange(id, e.target.value)}
                      disabled={!item.enabled}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {validationErrors.length > 0 && (
            <ul className="errors">
              {validationErrors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )}
        </section>

        <div className="actions">
          <button className="btn ghost" onClick={handleCancel} disabled={isSaving}>
            Отмена
          </button>
          <button className="btn primary" onClick={handleSave} disabled={!canSave}>
            {isSaving ? 'Сохранение…' : 'Сохранить'}
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
