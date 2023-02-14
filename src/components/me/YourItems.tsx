import Button from "../common/form/Button";
import type { FC } from "react";
import Table from "../common/table/Table";
import Tbody from "../common/table/Tbody";
import Td from "../common/table/Td";
import Th from "../common/table/Th";
import Thead from "../common/table/Thead";
import { api } from "../../utils/api";
import { useProductStore } from "../../stores/product";

interface YourItemsProps {}

const YourItems: FC<YourItemsProps> = ({}) => {
  const setIsCreateModalOpen = useProductStore(
    (state) => state.setIsCreateModalOpen
  );

  const { data: getMyProducts, status } = api.product.getMyProducts.useQuery();

  if (status == "loading") return null;

  return (
    <>
      <div className="space-y-4">
        <Table>
          <Thead>
            <tr>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>Actions</Th>
            </tr>
          </Thead>
          <Tbody>
            {getMyProducts &&
              getMyProducts.products.map((product) => (
                <tr key={product.id}>
                  <Td>{product.title}</Td>
                  <Td>{product.price.toString()}</Td>
                  <Td></Td>
                </tr>
              ))}
          </Tbody>
        </Table>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          Start selling!
        </Button>
      </div>
    </>
  );
};
export default YourItems;
