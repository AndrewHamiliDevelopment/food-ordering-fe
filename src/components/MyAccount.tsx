import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Api, Order } from "../api";
import { Card, Container } from "react-bootstrap";
import { store } from "../store";

interface Props {
  api: Api;
}

const MyAccount: React.FC<Props> = (props: Props) => {
  const { api } = props;
  const [page, setPage] = React.useState(1);
  const [size, setSize] = React.useState(10);
  const [isLoading, setIsLoading] = React.useState(false);
  const columns: TableColumn<Order>[] = [
    {
      id: "id",
      name: "ID #",
      selector: (row) => row.id,
    },
    {
      id: "status",
      name: "Status",
      selector: (row) => row.status,
    },
    {
      id: "recipientName",
      name: "Recipient Name",
      compact: true,
      wrap: true,
      selector: (row) => `${row.address.recipientName}`,
    },
    {
      id: "address",
      name: "Delivery Address",
      compact: true,
      wrap: true,
      selector: (row) =>
        `${row.address.line1} ${row.address.line2} ${row.address.cityMunicipality}`,
    },
    {
      id: "paymentMethod",
      name: "Payment Method",
      selector: (row) =>
        row.paymentMethod !== null ? row.paymentMethod.name : "--",
    },
  ];

  const getData = () => {
    setIsLoading(true);
    api
      .getOrders({ page, size })
      .then((res) => (store.orders = res.data))
      .catch((error) => console.error("error", error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    getData();
  }, [page, size]);

  React.useEffect(() => {
    console.log("updated orders");
  }, [store.orders]);

  return (
    <div>
      <Container>
        <Card>
          <Card.Body>
            <DataTable
              progressPending={isLoading}
              title={"Orders"}
              columns={columns}
              data={store.orders.data}
              pagination
              paginationServer
              paginationTotalRows={store.orders.meta.totalItems}
              paginationPerPage={size}
              highlightOnHover
              responsive
              onChangePage={(page) => setPage(page)}
            />
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default MyAccount;
