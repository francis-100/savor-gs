import Inventory from "./Inventory";
import Orders from "./Orders";
import Footer from "./Footer";

function Dashboard() {
    return (
        <div className="bg-zinc-900">
            <h1 className="text-white text-center p-6 mt-6">DASHBOARD</h1>
            <Inventory />
            <Orders />
            <Footer />
        </div>
    );
};

export default Dashboard;