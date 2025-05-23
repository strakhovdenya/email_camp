export function letterHtmlTemplate({
  roomNumber,
  note,
  photoUrl,
  createdAt,
}: {
  roomNumber: string;
  note?: string;
  photoUrl?: string;
  createdAt?: string;
}) {
  return `
  <div style="font-family: Arial, sans-serif; background: #f6f8fa; padding: 32px;">
    <div style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 32px;">
      <h2 style="color: #2563eb; text-align: center; margin-bottom: 16px;">Новое письмо для комнаты <span style="color: #111;">${roomNumber}</span></h2>
      <p style="font-size: 16px; color: #222; margin-bottom: 16px;">
        <b>Описание:</b> ${note ? note : '<span style="color:#888;">(нет описания)</span>'}
      </p>
      ${
        photoUrl
          ? `
        <div style="text-align: center; margin-bottom: 16px;">
          <img src="${photoUrl}" alt="Фото письма" style="max-width: 320px; max-height: 320px; border-radius: 8px; box-shadow: 0 2px 8px #0002;" />
        </div>
      `
          : ''
      }
      ${createdAt ? `<div style="text-align:right; color:#888; font-size:13px;">${createdAt}</div>` : ''}
      <div style="margin-top: 24px; text-align: center; color: #888; font-size: 13px;">
        Email Camp &copy; ${new Date().getFullYear()}
      </div>
    </div>
  </div>
  `;
}
