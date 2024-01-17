import { useTranslation } from "react-i18next";
import language from "@/assets/language.svg";
import github from "@/assets/github.svg";
import discord from "@/assets/discord.svg";
import steam from "@/assets/steam.svg";

export const Footer = () => {
  const { i18n } = useTranslation();

  return (
    <footer>
      <button
        className="footer-item"
        onClick={() =>
          i18n.changeLanguage(i18n.language === "en" ? "ru" : "en")
        }
      >
        <img src={language} alt="language" className="footer-img" />
      </button>
      <a
        className="footer-item"
        href="https://github.com/legerakun"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={github} alt="github" className="footer-img" />
      </a>
      <a
        className="footer-item"
        href="https://discord.com/users/153491549995401216"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={discord} alt="discord" className="footer-img" />
      </a>
      <a
        className="footer-item"
        href="https://steamcommunity.com/id/legera_kun/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={steam} alt="steam" className="footer-img" />
      </a>
    </footer>
  );
};