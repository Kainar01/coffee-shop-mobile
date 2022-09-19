import { StackScreenProps } from "@react-navigation/stack"
import franchiseApi from "api/franchise/api"
import { AdminFranchiseStackParamList } from "features/admin/navigators/Franchise"
import { FranchiseSaleStatistics } from "features/franchise/components/FranchiseSaleStatistics"

export const AdminFranchiseStats = ({ route }: StackScreenProps<AdminFranchiseStackParamList>) => {
  const franchiseId = route.params?.franchiseId as number

  console.log(franchiseId)
  const { currentData: purchaseStats, isLoading } = franchiseApi.endpoints.getPurchaseStats.useQuery(franchiseId, { skip: !franchiseId })
  console.log(purchaseStats, isLoading)
  return (<>
    {purchaseStats && <FranchiseSaleStatistics purchaseStats={purchaseStats} />}
  </>)
}
