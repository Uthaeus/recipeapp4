import Sidebar from "../components/home/sidebar";

function Home() {
    return (
        <div className="home">
            <div className="home-left">
                <h1>Home</h1>
            </div>
            <div className="home-right">
                <Sidebar />
            </div>
        </div>
    );
}

export default Home;