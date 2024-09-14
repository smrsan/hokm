import CardHand from "./components/CardHand";

function App() {
    return (
        <>
            <CardHand isOpponent position="top" />
            <CardHand isOpponent position="left" />
            <CardHand isOpponent position="right" />
            <CardHand position="bottom" />
        </>
    );
}

export default App;
