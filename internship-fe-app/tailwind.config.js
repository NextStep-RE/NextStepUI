/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "rtb-black": "#232931",
        "rtb-grey-01": "#96A0B6",
        "rtb-blue": "#00AEEF",
        "rtb-red": "#F55944",
        "rtb-dark-blue": "#0791F5",
        "rtb-gray": "#1C2126",
        "rtb-light-gray": "#F2F2F2",
        "rtb-super-light-blue": "#F8FDFF",
        "rtb-diabled-gray": "#D3D4D6",
        "light-gray": "#E9EAEA",
      },
      height: {
        "popup-container": "58.3vh",
        "popup-light-blue-container": "28.5vh",
        button: "6.4vh",
        "items-container": "7vh",
        "check-icon": "5.7vh",
        "history-view-container": "66.7vh",
        "history-view-button": "4.2vh",
        "history-view-table": "17.2vh",
        "history-view-table-first-row": "6.1vh",
      },
      width: {
        "popup-container": "42.9vw",
        "popup-light-blue-container": "36.7vw",
        "check-icon": "3.2vw",
        "items-container": "19.2vw",
        "button-container": "31.9vw",
        button: "14.8vw",
        "history-view-container": "77vw",
        "history-view-button": "9.5vw",
        "history-view-table": "55.6vw",
      },
    },
  },
  plugins: [],
};
