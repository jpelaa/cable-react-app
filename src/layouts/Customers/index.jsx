import React from "react";
import PlusIcon from "assets/svg/icons/svg/icon-plus.svg";
import routes from "static/routes";
import customerTableHeader from "static/customerTableHeader";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Error from "components/Error";
import Pagination from "components/Pagination";
import { PAGE_LIMIT } from "static";

const CUSTOMER_QUERY = gql`
  query customers($offset: Int, $limit: Int) {
    customers(
      offset: $offset
      limit: $limit
      where: { active: { _eq: true } }
    ) {
      installationDate: installation_date
      customerNo: customer_no
      name
      phoneNo: phone_no
      id
    }
  }
`;
const Customers = ({ navigate, page }) => {
  const { data, loading, error, fetchMore } = useQuery(CUSTOMER_QUERY, {
    variables: {
      offset: Number(page) - 1,
      limit: PAGE_LIMIT,
    },
    fetchPolicy: "cache-and-network",
  });

  const onLoadMore = async () => {
    try {
      fetchMore({
        variables: {
          offset: data.customers.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            customers: [...prev.customers, ...fetchMoreResult.customers],
          });
        },
      });
      console.log(data.customers, " fetchMoreResult customers ");
    } catch (err) {
      console.log(err.toString(), " Customer page error");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <Error />;
  }

  return (
    <>
      <div class="flex-1 flex justify-end">
        <a
          onClick={() => navigate(routes.create)}
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
        >
          <img src={PlusIcon} alt="add icon" />
          new
        </a>
      </div>
      <div class="flex flex-col">
        <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table class="min-w-full">
              <thead>
                <tr>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    {customerTableHeader.customerNo}
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    {customerTableHeader.name}
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    {customerTableHeader.phoneNo}
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    {customerTableHeader.installationDate}
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody class="bg-white">
                {data.customers.map(
                  ({ customerNo, name, phoneNo, installationDate, id }) => {
                    return (
                      <tr key={id}>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div class="text-sm leading-5 font-medium text-gray-900">
                            {customerNo}
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div class="text-sm leading-5 text-gray-900">
                            {name}
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          {phoneNo}
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                          {installationDate}
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                          <a
                            href="#"
                            class="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
          <Pagination previousPageClick={() => {}} nextPageClick={onLoadMore} />
        </div>
      </div>
    </>
  );
};

export default Customers;
