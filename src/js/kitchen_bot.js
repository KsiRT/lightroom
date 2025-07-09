


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("order-form");

    const BOT_TOKEN = "7974097700:AAEQgAQwvLTCf5ZyjnBen7g5-x6zAjrn7yg"; //
  const CHAT_ID = "-4822745570"; // 
  const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const address = form.address.value.trim();

    if (!name || !phone ||  !address) {
      Toastify({
        text: "Будь ласка, заповніть усі поля!",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "#ff4b2b",
      }).showToast();
      return;
    }

    const message = `
🛍 <b>Нове замовлення – Блендер </b>\n
👤 Ім’я: <b>${name}</b>\n
📞 Телефон: <b>${phone}</b>\n
🏠 Адреса доставки: <b>${address}</b>\n
    `;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      });

      if (response.ok) {
        Toastify({
          text: "Замовлення успішно відправлено!",
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "#00b09b",
        }).showToast();
        form.reset();
      } else {
        throw new Error("Помилка при відправленні");
      }
    } catch (error) {
      Toastify({
        text: "Помилка: не вдалося надіслати замовлення",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "#ff4b2b",
      }).showToast();
    }
  });
});
