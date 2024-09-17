import CardHand from "./components/LinearCardHand";
import CardsTable from "./components/CardsTable";

function App() {
    return (
        <CardsTable>
            <CardHand position="top" />
            <CardHand position="left" />
            <CardHand position="right" />
            <CardHand position="bottom" />
        </CardsTable>
    );
}

export default App;
