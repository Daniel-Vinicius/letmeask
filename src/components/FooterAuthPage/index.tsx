import "./styles.scss";

import { useAuth } from "../../hooks/useAuth";

import { ToggleThemeButton } from "../ToggleThemeButton";

export function FooterAuthPage(): JSX.Element {
  const { user, logout } = useAuth();

  if (user) {
    return (
      <footer id="footer-auth-page">
        <div>
          {user && (
            <div className="user-info">
              <img src={user.avatar} alt={`Foto de ${user.name}`} />
              <span>Logado como {user.name}</span>
            </div>
          )}
          <div className="toggleThemeContainer">
            <ToggleThemeButton />
          </div>
        </div>

        {user && (
          <button type="button" onClick={logout}>
            Logout
          </button>
        )}
      </footer>
    );
  }

  return (
    <div id="no-user">
      <ToggleThemeButton />
    </div>
  );
}
