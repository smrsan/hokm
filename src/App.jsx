import CardHand from "./components/CardHand";
import CardsTable from "./components/CardsTable";

function App() {
    return (
        <CardsTable>
            <CardHand isOpponent position="top" />
            <CardHand position="bottom" />
        </CardsTable>
    );
}

export default App;
