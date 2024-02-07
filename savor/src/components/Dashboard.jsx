import Inventory from "./Inventory";
import Orders from "./Orders";

function Dashboard() {
    return (
        <>
            <h1>Dashboard</h1>
            <Inventory />
            <Orders />
        </>
    );
};

export default Dashboard;