import CardHand from "./components/CardHand";
import CardsTable from "./components/CardsTable";

function App() {
    return (
        <CardsTable>
            {/* <CardHand isOpponent position="top" />
            <CardHand isOpponent position="left" />
            <CardHand isOpponent position="right" /> */}
            <CardHand position="bottom" />
        </CardsTable>
    );
}

export default App;
