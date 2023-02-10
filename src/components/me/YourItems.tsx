import Button from "../common/form/Button";
import type { FC } from "react";
import Table from "../common/table/Table";
import Tbody from "../common/table/Tbody";
import Td from "../common/table/Td";
import Th from "../common/table/Th";
import Thead from "../common/table/Thead";
import { useProductStore } from "../../stores/product";

interface YourItemsProps {}

const YourItems: FC<YourItemsProps> = ({}) => {
  const setIsCreateModalOpen = useProductStore(
    (state) => state.setIsCreateModalOpen
  );

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
            <tr>
              <Td>No Items</Td>
            </tr>
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
