const tabs = document.querySelectorAll(".tab");
const views = document.querySelectorAll(".view");
const sidebar = document.getElementById("sidebar");
const menuButton = document.getElementById("menuButton");
const themeButton = document.getElementById("themeButton");
const toast = document.getElementById("toast");

let toastTimer;

/* Switch between Student, Parent, and Educator dashboards */
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedView = tab.dataset.view;

    tabs.forEach((item) => item.classList.remove("active"));
    views.forEach((view) => view.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(selectedView).classList.add("active");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

/* Open / close mobile sidebar */
menuButton.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

/* Dark mode */
themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeButton.innerHTML = "<i>☾</i> Light mode";
  } else {
    themeButton.innerHTML = "<i>☼</i> Appearance";
  }
});

/* Quick practice notification */
document.querySelectorAll(".practice-btn").forEach((button) => {
  button.addEventListener("click", () => {
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  });
});

/* Highlight sidebar navigation */
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach((item) => {
      item.classList.remove("active");
    });

    link.classList.add("active");
    sidebar.classList.remove("open");
  });
});
