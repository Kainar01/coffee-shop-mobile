import franchiseApi from "api/franchise/api"
import { FranchiseSaleStatistics } from "features/franchise/components/FranchiseSaleStatistics"
import { useAuth } from "hooks/useAuth"

export const FranchiseStatistics = () => {
  const { user } = useAuth()

  const franchiseId = user?.franchise?.id as number

  const { data: purchaseStats } = franchiseApi.endpoints.getPurchaseStats.useQuery(franchiseId, { skip: !franchiseId })

  console.log(purchaseStats)
  return (<>
    {purchaseStats && <FranchiseSaleStatistics purchaseStats={purchaseStats} />}
  </>)
}
