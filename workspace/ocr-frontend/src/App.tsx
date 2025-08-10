import { useState } from 'react'

function App() {
  const [currency, setCurrency] = useState('RUB')
  const [cardEnabled, setCardEnabled] = useState(false)
  const [cardMinAmount, setCardMinAmount] = useState<string>('10000')
  const [sbpEnabled, setSbpEnabled] = useState(false)
  const [sbpMinAmount, setSbpMinAmount] = useState<string>('')

  function handleSave() {
    const payload = {
      currency,
      rules: {
        card: { enabled: cardEnabled, minManualCheckAmount: Number(cardMinAmount || 0) || 0 },
        sbp: { enabled: sbpEnabled, minManualCheckAmount: Number(sbpMinAmount || 0) || 0 },
      },
    }
    // eslint-disable-next-line no-console
    console.log('Save OCR settings', payload)
    alert('Настройки сохранены (см. консоль для payload)')
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="flex">
        {/* Sidebar placeholder */}
        <aside className="w-64 bg-slate-900 text-white min-h-screen px-4 py-6 hidden md:block">
          <div className="text-xl font-semibold mb-6">Dashboard</div>
          <nav className="space-y-2 text-sm">
            <div className="px-3 py-2 rounded hover:bg-slate-800">Выводы</div>
            <div className="px-3 py-2 rounded hover:bg-slate-800">Работа с транзакциями</div>
            <div className="px-3 py-2 rounded hover:bg-slate-800">Депозиты</div>
            <div className="px-3 py-2 rounded hover:bg-slate-800">Проверка блокировок</div>
            <div className="px-3 py-2 rounded hover:bg-slate-800">Алерты</div>
            <div className="px-3 py-2 rounded hover:bg-slate-800">Настройки</div>
            <div className="px-3 py-2 rounded hover:bg-slate-800">Пользователи</div>
            <div className="px-3 py-2 rounded hover:bg-slate-800">Собственные карты</div>
            <div className="px-3 py-2 rounded hover:bg-slate-800">Банки</div>
            <div className="px-3 py-2 rounded hover:bg-slate-800">Методы</div>
            <div className="px-3 py-2 rounded hover:bg-slate-800 bg-slate-800">OCR</div>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 md:p-10">
          <header className="mb-6">
            <h1 className="text-3xl font-bold">Редактирование настроек OCR</h1>
          </header>

          <section className="space-y-6">
            {/* Currency */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Валюта</label>
              <select
                className="w-56 h-11 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="RUB">RUB</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>

            {/* Rules table */}
            <div className="bg-white rounded-xl border border-gray-200 p-0 overflow-hidden">
              <div className="grid grid-cols-12 items-center px-6 py-4 text-sm font-semibold text-gray-600 border-b border-gray-200">
                <div className="col-span-4">Тип реквизитов</div>
                <div className="col-span-5">Отправка чеков на ручную верификацию операторов</div>
                <div className="col-span-3">Минимальная сумма ручной проверки</div>
              </div>

              {/* Row: Перевод на карту */}
              <div className="grid grid-cols-12 items-center px-6 py-4 border-b border-gray-100">
                <div className="col-span-4 text-gray-900">Перевод на карту</div>
                <div className="col-span-5 flex items-center gap-3">
                  <input
                    id="card-enabled"
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={cardEnabled}
                    onChange={(e) => setCardEnabled(e.target.checked)}
                  />
                  <label htmlFor="card-enabled" className="text-gray-800 select-none">Включить</label>
                </div>
                <div className="col-span-3">
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="Введите сумму"
                    className="w-full h-10 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3"
                    value={cardMinAmount}
                    onChange={(e) => setCardMinAmount(e.target.value)}
                    disabled={!cardEnabled}
                  />
                </div>
              </div>

              {/* Row: СБП */}
              <div className="grid grid-cols-12 items-center px-6 py-4">
                <div className="col-span-4 text-gray-900">СБП</div>
                <div className="col-span-5 flex items-center gap-3">
                  <input
                    id="sbp-enabled"
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={sbpEnabled}
                    onChange={(e) => setSbpEnabled(e.target.checked)}
                  />
                  <label htmlFor="sbp-enabled" className="text-gray-800 select-none">Включить</label>
                </div>
                <div className="col-span-3">
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="Введите сумму"
                    className="w-full h-10 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3"
                    value={sbpMinAmount}
                    onChange={(e) => setSbpMinAmount(e.target.value)}
                    disabled={!sbpEnabled}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="h-11 px-5 rounded-lg border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                onClick={() => {
                  setCurrency('RUB')
                  setCardEnabled(false)
                  setCardMinAmount('10000')
                  setSbpEnabled(false)
                  setSbpMinAmount('')
                }}
              >
                Отмена
              </button>
              <button
                type="button"
                className="h-11 px-5 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleSave}
              >
                Сохранить
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
