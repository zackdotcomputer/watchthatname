import { Form, SearchField, Submit } from "@redwoodjs/forms";
import { navigate, routes } from "@redwoodjs/router";

export default function SearchForm({ initialValue }: { initialValue?: string }) {
  const onSubmit = (data) => {
    navigate(routes.searchQuery({ query: data.query ?? "" }));
  };

  return (
    <Form onSubmit={onSubmit} className="flex w-full justify-center items-end">
      <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
        <SearchField
          name="query"
          defaultValue={initialValue}
          placeholder="mygreatidea.com"
          className="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-blue-200 focus:bg-transparent border border-gray-300 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <Submit className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">
        Search
      </Submit>
    </Form>
  );
}
