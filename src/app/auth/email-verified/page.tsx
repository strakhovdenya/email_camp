export default function EmailVerifiedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Почта подтверждена!</h1>
      <p className="text-lg text-gray-600 mb-8">
        Спасибо за подтверждение почты. Теперь вы можете войти в систему.
      </p>
      <a
        href="/auth"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Войти
      </a>
    </div>
  );
}
