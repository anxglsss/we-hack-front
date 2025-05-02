// app/organizer/page.tsx
export default function OrganizerPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Организатор</h1>
      <p>Здесь вы можете управлять мероприятиями вашего клуба.</p>
      <ul className="mt-4 list-disc list-inside">
        <li>🛠 Создание и редактирование событий</li>
        <li>📬 Рассылка уведомлений подписчикам</li>
        <li>📈 Просмотр статистики по билетам</li>
        <li>📦 Архивация завершённых мероприятий</li>
      </ul>
    </div>
  )
}