import { ContactManager } from "../components/ContactManager";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-300">
      <div className="container mx-auto py-8 px-4">
        <ContactManager />
      </div>
    </div>
  );
};

export default Home;
