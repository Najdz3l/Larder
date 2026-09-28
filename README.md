# Larder

Prosta aplikacja do śledzenia tego, co masz w domu (jedzenie, chemia, cokolwiek sam dodasz). Każdy produkt ma status Mam, Mało albo Brak, opcjonalnie ilość z jednostką i notatkę. Wszystko trzymane w localStorage, bez backendu, hostowane jako statyczna strona na GitHub Pages.

## Stack technologiczny

* React 19 + TypeScript
* Vite jako bundler
* Zustand (z middleware `persist`) do stanu aplikacji
* Docker i docker compose do lokalnego developmentu
* ESLint

## Struktura folderów i plików

```
Larder/
├── public/
│   └── favicon.ico
│
├── src/
│   ├── main.tsx                              # punkt wejścia, montuje App do #root
│   ├── pages/
│   │   └── App.tsx                           # przełącza między MainLayout a ToBuyLayout, trzyma aktywną zakładkę
│   │
│   ├── components/
│   │   ├── atoms/
│   │   │   └── headers/
│   │   │       ├── h1.tsx                    # nagłówek H1
│   │   │       ├── StatusPill.tsx            # kolorowa pigułka statusu (Mam / Mało / Brak)
│   │   │       ├── IconButton.tsx            # przycisk z ikoną, używany pod ✕ (usuń) i ✎ (edytuj szczegóły)
│   │   │       ├── Chip.tsx                  # pojedynczy "chip" listy w poziomym pasku przełączników
│   │   │       └── TextField.tsx             # pole tekstowe pod formularze dodawania
│   │   │
│   │   ├── molecules/
│   │   │   ├── Top.tsx                       # nagłówek widoku list, tytuł plus przycisk Edytuj
│   │   │   ├── ItemRow.tsx                   # wiersz produktu, nazwa, meta (ilość/notatka), StatusPill, akcje
│   │   │   ├── CategoryHeader.tsx            # nagłówek kategorii w akordeonie, nazwa plus licznik do kupienia
│   │   │   ├── AddEntryForm.tsx              # generyczny formularz z jednym polem, używany do dodawania produktu, kategorii i listy
│   │   │   └── BuyRow.tsx                    # wiersz w widoku Do kupienia, checkbox plus nazwa plus meta plus StatusPill
│   │   │
│   │   ├── organisms/
│   │   │   ├── ListSwitcher.tsx              # cały pasek Chipów list plus formularz nowej listy w trybie edycji
│   │   │   ├── CategoryAccordion.tsx         # rozwijana kategoria, nagłówek plus lista ItemRow plus formularz dodawania
│   │   │   ├── BuyGroup.tsx                  # grupa pozycji do kupienia z jednej listy i kategorii
│   │   │   └── BottomNav.tsx                 # dolny pasek nawigacji między zakładkami Listy i Do kupienia, z licznikiem
│   │   │
│   │   └── templates/
│   │       └── layouts/
│   │           ├── MainLayout.tsx            # widok Listy, Top plus ListSwitcher plus CategoryAccordion dla aktywnej listy
│   │           └── ToBuyLayout.tsx           # widok Do kupienia, formularz dopisania czegoś spoza list plus BuyGroup plus przycisk zatwierdzenia
│   │
│   ├── assets/
│   │   ├── fonts/
│   │   └── images/
│   │
│   ├── lib/
│   │   ├── store/
│   │   │   ├── larderStore.ts                # store zustand z middleware persist, cała logika stanu aplikacji
│   │   │   └── larderStore.types.ts          # typy store'a (akcje, stan)
│   │   ├── types/
│   │   │   └── index.ts                      # Status, Item, Category, List, AppState, ItemDetailsPatch
│   │   ├── constants/
│   │   │   ├── status.ts                     # etykiety statusów i kolejność przełączania
│   │   │   └── units.ts                      # podpowiedzi jednostek (szt, kg, g, l, ml, opak)
│   │   ├── helpers/
│   │   │   └── formatQty.ts                  # formatowanie ilości z przecinkiem
│   │   └── hooks/
│   │
│   └── styles/
│       └── global.css
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── eslint.config.js
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Model danych

```ts
type Status = "have" | "low" | "out";

interface Item {
  id: string;
  name: string;
  status: Status;
  qty: number | null;
  unit: string | null;
  note: string | null;
}

interface Category {
  id: string;
  name: string;
  items: Item[];
}

interface List {
  id: string;
  name: string;
  categories: Category[];
}

interface AppState {
  version: 1;
  lists: List[];
  cart: string[]; // id produktów zaznaczonych w koszyku w widoku Do kupienia, jeszcze niezatwierdzonych
}
```

Status ma trzy wartości i przełącza się cyklicznie jednym tapem w produkt: Mam, Mało, Brak, i od nowa. Ilość, jednostka i notatka są całkowicie opcjonalne, dodajesz je tylko tam, gdzie akurat chcesz, przez ikonę ✎ dostępną przy każdym produkcie.

## Store

`larderStore.ts` trzyma cały `AppState` i wystawia akcje takie jak `cycleStatus`, `setItemDetails` (ilość, jednostka, notatka), `addItem`, `addCategory`, `addList`, `deleteItem`, `deleteCategory`, `deleteList`, `toggleCartItem` i `confirmCart` (przenosi zaznaczone pozycje na status Mam i czyści koszyk). Middleware `persist` zapisuje cały stan do localStorage automatycznie, więc żaden komponent nie musi się tym zajmować ręcznie.

Koszyk (`cart`) jest częścią zapisywanego stanu, dzięki czemu zaznaczenia w widoku Do kupienia przetrwają odświeżenie strony albo zamknięcie aplikacji w trakcie zakupów.

## Widoki

Aplikacja ma dwie zakładki, przełączane dolnym paskiem nawigacji:

* **Listy** (`MainLayout`), przegląd wszystkich list i kategorii, tu zmieniasz statusy i dodajesz nowe produkty, kategorie i listy
* **Do kupienia** (`ToBuyLayout`), automatycznie generowany widok wszystkich produktów ze statusem Mało lub Brak, z checkboxem do zaznaczenia w koszyku i przyciskiem Zatwierdź zakupy

## Uruchomienie

Docker (zalecane na czas developmentu):

```bash
docker compose up -d
```

Aplikacja dostępna pod `http://localhost:8080`.

Lokalnie bez Dockera:

```bash
npm install
npm run dev      # serwer deweloperski Vite
npm run build    # build produkcyjny
npm run lint     # ESLint
npm run preview  # podgląd builda lokalnie
```

## GitHub Pages

Konfiguracja `base` w `vite.config.ts` i workflow do deployu zostają ustawione na końcu projektu, gdy struktura aplikacji będzie już gotowa.
