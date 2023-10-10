(function () {
  const client = ZAFClient.init();

  client.get("currentUser.locale").then((data) => {
    let userLocale = data["currentUser.locale"].toLowerCase();
    const locale = getSupportedLocale(userLocale);

    document.querySelectorAll("[data-i18n-key]").forEach((element) => {
      translateElement(element, locale);
    });
  });
})();

function getSupportedLocale(userLocale) {
  // Check if translations exist for locale
  // If not, return a locale of "en"
  let supportedLocales = Object.keys(translations).map((item) => {
    return item.toLowerCase();
  });

  if (supportedLocales.includes(userLocale)) {
    return userLocale;
  } else {
    return "en";
  }
}

function translateElement(element, locale) {
  const key = element.getAttribute("data-i18n-key");
  const translation = translations[locale]["default"][key];
  element.innerText = translation;
}
