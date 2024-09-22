"use client";

import { useState } from "react";
import axios from "axios";
import ResponseDisplay from "./ResponseDisplay";
import { BFHLResponse, FilterOption } from "@/lib/types";

export default function BFHLForm() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState<BFHLResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setResponse(null);
        setIsLoading(true);

        try {
            const parsedInput = JSON.parse(input);
            const { data } = await axios.post<BFHLResponse>("/api/bfhl", parsedInput);
            setResponse(data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || "API request failed");
            } else {
                setError("Invalid JSON input");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterChange = (option: FilterOption) => {
        setSelectedFilters((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );
    };

    return (
        <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="mb-6">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Enter JSON (e.g., { "data": ["A","C","z"] })'
                    className="w-full p-3 border rounded-lg mb-3 font-mono text-sm"
                    rows={6}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? "Processing..." : "Submit"}
                </button>
            </form>

            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                    <p>{error}</p>
                    <p>Check for curly brackets</p>
                    <p>Please make sure you have correct inverted commas &quot;M&quot; not “M”</p>
                    
                </div>
            )}

            {response && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Filter Response:</h2>
                    <div className="flex flex-wrap gap-3">
                        {["Alphabets", "Numbers", "Highest lowercase alphabet"].map(
                            (option) => (
                                <label key={option} className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedFilters.includes(option as FilterOption)}
                                        onChange={() => handleFilterChange(option as FilterOption)}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    />
                                    <span className="ml-2 text-gray-700">{option}</span>
                                </label>
                            )
                        )}
                    </div>
                </div>
            )}

            {response && (
                <ResponseDisplay response={response} selectedFilters={selectedFilters} />
            )}
        </div>
    );
}
