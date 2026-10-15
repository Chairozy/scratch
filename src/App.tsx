import {
  createSignal,
  onCleanup,
  type Component,
  type ParentComponent,
} from "solid-js";
import Home from "./pages/Home";
import Tutorial from "./pages/Tutorial";

type Route = { name: "home" } | { name: "tutorial"; id: string };

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#/, "");
  const match = hash.match(/^\/?tutorial\/([^/?#]+)/);
  if (match) return { name: "tutorial", id: decodeURIComponent(match[1]) };
  return { name: "home" };
}

const Layout: ParentComponent = (props) => (
  <div class="min-h-screen">
    <header class="print-hidden border-b-2 border-black bg-white">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <a href="#/" class="text-lg font-extrabold tracking-tight">
          Tutorial Scratch
        </a>
        <nav class="flex items-center gap-4 text-sm font-semibold">
          <a href="#/" class="underline underline-offset-4">
            Beranda
          </a>
        </nav>
      </div>
    </header>

    <main>{props.children}</main>

    <footer class="print-hidden border-t-2 border-black bg-white">
      <div class="mx-auto max-w-5xl px-4 py-4 text-xs text-neutral-700">
        Tutorial Scratch berbahasa Indonesia dengan contoh blok kode.
      </div>
    </footer>
  </div>
);

const App: Component = () => {
  const [route, setRoute] = createSignal<Route>(parseHash());

  const onHashChange = () => setRoute(parseHash());
  window.addEventListener("hashchange", onHashChange);
  onCleanup(() => window.removeEventListener("hashchange", onHashChange));

  return (
    <Layout>
      {route().name === "tutorial" ? (
        <Tutorial id={(route() as { id: string }).id} />
      ) : (
        <Home />
      )}
    </Layout>
  );
};

export default App;
