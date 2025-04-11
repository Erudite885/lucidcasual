
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FormulaInput } from "./components/FormularInput";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="p-10 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Formula Input Functionality</h1>
        <FormulaInput />
      </main>
    </QueryClientProvider>
  );
}

export default App;
