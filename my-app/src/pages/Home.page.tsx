import { ActionIcon, Flex, Pagination, Space, Tooltip } from "@mantine/core";
import { Plus } from "lucide-react";
import classes from "./style/home.module.css";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { EhrList } from "../components/EhrList";
import { useState } from "react";
import usePagination from "../hook/usePagination";

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = usePagination(searchQuery, currentPage);

  return (
    <>
      <Flex direction="column" align="center" className={classes.container}>
        <SearchBar
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
        ></SearchBar>

        <EhrList data={data} isLoading={isLoading} error={error}></EhrList>

        <Space h=""></Space>
        <Pagination
          value={currentPage}
          onChange={setCurrentPage}
          mt="xl"
          total={data?.pagination?.totalPages || 1}
        ></Pagination>

        <Tooltip label="Add EHR">
          <ActionIcon
            mb="xs"
            mr="md"
            variant="filled"
            size="xl"
            radius="md"
            aria-label="Add"
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
            }}
            onClick={() => navigate("ehr/create")}
          >
            <Plus style={{ width: "70%", height: "70%" }} />
          </ActionIcon>
        </Tooltip>
      </Flex>
    </>
  );
}
