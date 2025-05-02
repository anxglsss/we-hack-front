// app/student/page.tsx
export default function StudentPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Студент</h1>
      <p>Добро пожаловать! Найдите интересные мероприятия и купите билеты.</p>
      <ul className="mt-4 list-disc list-inside">
        <li>📅 Просмотр предстоящих событий</li>
        <li>💳 Онлайн-покупка билетов</li>
        <li>🔍 Поиск и фильтрация событий</li>
        <li>🤝 Подписка на клубы и уведомления</li>
      </ul>
    </div>
  )
}