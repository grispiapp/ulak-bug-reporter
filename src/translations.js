const tr = {
	feedbackButtonText: "Hata bildir",
	sendBtnText: "Hatayı Gönder",
	sendBtnLoading: "Lütfen bekleyiniz...",
	successMessage: "Hata kaydınız (TICKET_KEY) gönderildi. Teşekkür ederiz.",
	sendErrorMessage: "Hata kaydınız gönderilemedi!\nLütfen bu mesajı kapattıktan sonra indirilen log dosyasını yetkililere kendiniz iletin.",
	close: 'Kapat',
	cancel: 'İptal',
	descPlaceholder: 'Hata hakkında açıklama (İsteğe bağlı)',
	authTokenNotFound: 'Erişim token\'ı bulunamadı!',
	loadingScreenshot: 'Ekran görüntüsü yükleniyor, lütfen bekleyiniz...',
}

const en = {
	feedbackButtonText: "Report a bug",
	sendBtnText: "Send bug report",
	sendBtnLoading: "Please wait...",
	successMessage: "Your bug report (TICKET_KEY) is sent. Thank you.",
	sendErrorMessage: "Could not send bug report!\nPlease send the log file that will be downloaded after closing this message to site admin yourself.",
	close: 'Close',
	cancel: 'Cancel',
	descPlaceholder: 'Optional description of the bug',
	authTokenNotFound: 'Access token not available!',
	loadingScreenshot: 'Loading screenshot, please wait...',
}

const translations = {
	tr: tr,
	en: en,
}

function t(key, params) {
  const text = translations.tr[key];
  if (text) {
  	if (params) {
  		return Object.keys(params).reduce((prev, curr) => prev.replace(curr, params[curr]), text);
  	}
  	return text;
  }
  return `{??${key}??}`;
}

export default t;
