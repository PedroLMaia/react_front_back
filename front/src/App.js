import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Faq } from "./pages/Faq";
import { Formulario } from "./pages/Form";
import { Home } from "./pages/Home";
import { Splash } from "./pages/Splash";
import { WebPlayer } from "./pages/WebPlayer";
import {Login} from "./pages/Login";
import { CreatePlaylist } from "./pages/CreatePlaylist";
import { Cadastro } from "./pages/Cadastro";
import { AtualizarCadastro } from "./pages/AtualizarCadastro";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
        <Route path="/" exact>
            <Login />
        </Route>
        <Route path="/user-playlists/:id" exact>
          <CreatePlaylist />
        </Route>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/faq" exact>
          <Faq />
        </Route>
        <Route path = "/Webplayer/:id" exact>
          <WebPlayer/>
        </Route>
        <Route path = "/Cadastro" exact>
          <Cadastro/>
        </Route>
        <Route path = "/atualizarCadastro" exact>
          <AtualizarCadastro/>
        </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
