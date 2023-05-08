import { backend } from "@/lib/backendApi";
import { queryClient } from "@/lib/queryClient";
import { AxiosError } from "axios";
import { ReactNode, createContext, useContext } from "react";
import { UseMutationResult, useMutation } from "react-query";
import { toast } from "react-toastify";

interface CreateDepartmentData {
  name: string;
  cost_center: string;
  is_board: boolean;
  board: string;
  responsible_id: string;
}

interface UpdateDepartmentData {
  id: number;
  name: string;
  cost_center: string;
  is_board: boolean;
  board: string;
  responsible_id: string;
}

interface DepartmentProviderContextData {
  createDepartment: UseMutationResult<
    CreateDepartmentData,
    unknown,
    CreateDepartmentData,
    unknown
  >;
  updateDepartment: UseMutationResult<
    UpdateDepartmentData,
    unknown,
    UpdateDepartmentData,
    unknown
  >;
}

const DepartmentContext = createContext({} as DepartmentProviderContextData);

interface DepartmentsProviderProps {
  children: ReactNode;
}

export function DepartmentProvider({ children }: DepartmentsProviderProps) {
  const createDepartment = useMutation(
    async (data: CreateDepartmentData) => {
      const res = await backend.post<CreateDepartmentData>("departments", {
        ...data,
      });

      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("Departamento criado com sucesso");
        queryClient.invalidateQueries("department");
      },
      onError: (err: AxiosError) => {
        toast.error(
          `Desculpe não conseguimos criar o departamento ${err.response.data}, tente mais tarde`
        );
      },
    }
  );

  const updateDepartment = useMutation(
    async (data: UpdateDepartmentData) => {
      const res = await backend.patch<UpdateDepartmentData>(
        `departments/${data.id}`,
        {
          ...data,
        }
      );

      return res.data;
    },
    {
      onSuccess: () => {
        toast.success("Departamento alterado com sucesso");
        queryClient.invalidateQueries("department");
      },
      onError: () => {
        toast.error(
          "Desculpe não conseguimos alterar o departamento, tente mais tarde"
        );
      },
    }
  );

  return (
    <DepartmentContext.Provider value={{ createDepartment, updateDepartment }}>
      {children}
    </DepartmentContext.Provider>
  );
}

export const useDepartment = () => useContext(DepartmentContext);
