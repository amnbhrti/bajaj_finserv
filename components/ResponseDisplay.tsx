import { BFHLResponse, FilterOption } from "@/lib/types";

interface ResponseDisplayProps {
  response: BFHLResponse;
  selectedFilters: FilterOption[];
}

export default function ResponseDisplay({
  response,
  selectedFilters,
}: ResponseDisplayProps) {
  return (
    <div className="bg-gray-100 p-4 rounded">
      <h2 className="text-xl font-semibold mb-2">Response:</h2>
      <pre className="whitespace-pre-wrap">
        {JSON.stringify(
          {
            is_success: response.is_success,
            user_id: response.user_id,
            email: response.email,
            roll_number: response.roll_number,
            ...(selectedFilters.includes("Alphabets") && {
              alphabets: response.alphabets,
            }),
            ...(selectedFilters.includes("Numbers") && {
              numbers: response.numbers,
            }),
            ...(selectedFilters.includes("Highest lowercase alphabet") && {
              highest_lowercase_alphabet: response.highest_lowercase_alphabet,
            }),
          },
          null,
          2
        )}
      </pre>
    </div>
  );
}