import Authorization from './pages/Authorization';
import OrgStructure from './pages/user_info/OrgStructure';
import DocFolders from './pages/user_info/DocFolders';
import DocList from './pages/user_info/DocList';
import Navigation from './components/Navigation';
import CreateDocForm from './pages/user_info/CreateDocForm';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainUserInfo } from './pages/user_info/MainUserInfo';
import MainPage from './pages/MainPage';
import DocumentRead from './pages/user_info/DocumentRead';
import DocUpdate from './pages/user_info/DocUpdate';
import { MainEcology } from './pages/ecology/MainEcology';
import DocEcologyFolders from './pages/ecology/DocEcologyFolders';
import DocEcologyList from './pages/ecology/DocEcologyList';
import CreateEcoWasteDocForm from './pages/ecology/waste/CreateEcoWasteDocForm';
import ReadEcoWasteDocForm from './pages/ecology/waste/ReadEcoWasteDocForm';
import UpdateEcoWasteDocForm from './pages/ecology/waste/UpdateEcoWasteDocForm';
import CreateEcoUtilizationDocForm from './pages/ecology/utilization/CreateEcoUtilizationDocForm';
import ReadEcoUtilizationDocForm from './pages/ecology/utilization/ReadEcoUtilizationDocForm';
import UpdateEcoUtilizationDocForm from './pages/ecology/utilization/UpdateEcoUtilizationDocForm';
import CreateEcoPlanDocForm from './pages/ecology/plans/CreateEcoPlanDocForm';
import ReadEcoPlanDocForm from './pages/ecology/plans/ReadEcoPlanDocForm';
import UpdateEcoPlanDocForm from './pages/ecology/plans/UpdateEcoPlanDocForm';
import CreateEcoPlan2DocForm from './pages/ecology/plans2/CreateEcoPlan2DocForm';
import ReadEcoPlan2DocForm from './pages/ecology/plans2/ReadEcoPlan2DocForm';
import UpdateEcoPlan2DocForm from './pages/ecology/plans2/UpdateEcoPlan2DocForm';
import CreateEcoPlan3DocForm from './pages/ecology/plans3/CreateEcoPlan3DocForm';
import ReadEcoPlan3DocForm from './pages/ecology/plans3/ReadEcoPlan3DocForm';
import UpdateEcoPlan3DocForm from './pages/ecology/plans3/UpdateEcoPlan3DocForm';
import CreateEcoOvocDocForm from './pages/ecology/ovos/CreateEcoOvocDocForm';
import ReadEcoOvocDocForm from './pages/ecology/ovos/ReadEcoOvocDocForm';
import UpdateEcoOvocDocForm from './pages/ecology/ovos/UpdateEcoOvocDocForm';
import {MainLaborProtection} from './pages/labor_protection/MainLaborProtection';
import DocLaborProtectionFolders from './pages/labor_protection/DocLabopProtectionFolders';
import Ensk from './pages/labor_protection/siz/Ensk';
import PpeWarehouseManagement from './pages/labor_protection/siz/PpeWarehouseManagement.js';
import PpePurchase from './pages/labor_protection/siz/ppePurchase/PpePurchase';
import PpeIssuanceCard from './pages/labor_protection/siz/issuanceCard/PpeIssuanceCard';
import PurchaseRequestMessage from './pages/labor_protection/siz/ppePurchase/PurchaseRequestMessage';
import PpeAllowance from './pages/labor_protection/siz/allowance/PpeAllowance';
import PpeReviews from './pages/labor_protection/siz/reviews/PpeReviews';
import PpeReviewsList from './pages/labor_protection/siz/reviews/PpeReviewsList';
import PpeAllowanceList from './pages/labor_protection/siz/allowance/PpeAllowanceList';
import PpeReviewsRead from './pages/labor_protection/siz/reviews/PpeReviewsRead';
import PpeReviewsEdit from './pages/labor_protection/siz/reviews/PpeReviewsEdit';
import PpeAllowanceRead from './pages/labor_protection/siz/allowance/PpeAllowanceRead';
import PpeAllowanceEdit from './pages/labor_protection/siz/allowance/PpeAllowanceEdit';
import PpeIssuanceList from './pages/labor_protection/siz/issuanceCard/PpeIssuanceList';
import PpeIssuanceRead from './pages/labor_protection/siz/issuanceCard/PpeIssuanceRead'
import PpeIssuanceEdit from './pages/labor_protection/siz/issuanceCard/PpeIssuanceEdit'
import PnbrList from './pages/labor_protection/pnb/pnbr/PnbrList'
import Pnbr from './pages/labor_protection/pnb/pnbr/Pnbr'
import PnbrCard from './pages/labor_protection/pnb/pnbrCard/PnbrCard'
import PnbvCard from './pages/labor_protection/pnb/pnbrCard/PnbvCard'

function App() {
  const { isAuth } = useSelector(store => store.login)

  if (isAuth) {
    return (
      <Router>
        <Navigation />

        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="/info" element={<MainUserInfo><OrgStructure /></MainUserInfo>} />
          <Route exact path="/info/folders/:id" element={<MainUserInfo><DocFolders /></MainUserInfo>} />
          <Route exact path="/info/list/:id" element={<MainUserInfo><DocList /></MainUserInfo>} />
          <Route exact path="/info/create" element={<MainUserInfo><CreateDocForm /></MainUserInfo>} />
          <Route exact path="/info/get/:id" element={<MainUserInfo><DocumentRead /></MainUserInfo>} />
          <Route exact path="/info/edit/:id" element={<MainUserInfo><DocUpdate /></MainUserInfo>} />
          <Route exact path="/ecology/folders/:id/nest/:nest" element={<MainEcology><DocEcologyFolders /></MainEcology>} />
          <Route exact path="/ecology/list/:id" element={<MainEcology><DocEcologyList /></MainEcology>} />
          <Route exact path="/ecology/create" element={<MainEcology><CreateEcoWasteDocForm /></MainEcology>} />
          <Route exact path="/ecology/get/:id" element={<MainEcology><ReadEcoWasteDocForm /></MainEcology>} />
          <Route exact path="/ecology/edit/:id" element={<MainEcology><UpdateEcoWasteDocForm /></MainEcology>} />
          <Route exact path="/ecology/util/create" element={<MainEcology><CreateEcoUtilizationDocForm /></MainEcology>} />
          <Route exact path="/ecology/util/get/:id" element={<MainEcology><ReadEcoUtilizationDocForm /></MainEcology>} />
          <Route exact path="/ecology/util/edit/:id" element={<MainEcology><UpdateEcoUtilizationDocForm /></MainEcology>} />
          <Route exact path="/ecology/plan/create" element={<MainEcology><CreateEcoPlanDocForm /></MainEcology>} />
          <Route exact path="/ecology/plan/get/:id" element={<MainEcology><ReadEcoPlanDocForm /></MainEcology>} />
          <Route exact path="/ecology/plan/edit/:id" element={<MainEcology><UpdateEcoPlanDocForm /></MainEcology>} />
          <Route exact path="/ecology/plan2/create" element={<MainEcology><CreateEcoPlan2DocForm /></MainEcology>} />
          <Route exact path="/ecology/plan2/get/:id" element={<MainEcology><ReadEcoPlan2DocForm /></MainEcology>} />
          <Route exact path="/ecology/plan2/edit/:id" element={<MainEcology><UpdateEcoPlan2DocForm /></MainEcology>} />
          <Route exact path="/ecology/plan3/create" element={<MainEcology><CreateEcoPlan3DocForm /></MainEcology>} />
          <Route exact path="/ecology/plan3/get/:id" element={<MainEcology><ReadEcoPlan3DocForm /></MainEcology>} />
          <Route exact path="/ecology/plan3/edit/:id" element={<MainEcology><UpdateEcoPlan3DocForm /></MainEcology>} />
          <Route exact path="/ecology/ovoc/create" element={<MainEcology><CreateEcoOvocDocForm /></MainEcology>} />
          <Route exact path="/ecology/ovoc/get/:id" element={<MainEcology><ReadEcoOvocDocForm /></MainEcology>} />
          <Route exact path="/ecology/ovoc/edit/:id" element={<MainEcology><UpdateEcoOvocDocForm /></MainEcology>} />
          <Route exact path="/labor_protection/folders/:id/nest/:nest" element={<MainLaborProtection><DocLaborProtectionFolders /></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/43" element={<MainEcology><PpeReviewsList /></MainEcology>} />
          <Route exact path="/labor_protection/list/38" element={<MainLaborProtection><Ensk/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/39" element={<MainLaborProtection><PpeWarehouseManagement/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/40" element={<MainLaborProtection><PpePurchase/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/42" element={<MainLaborProtection><PpePurchase/></MainLaborProtection>} />
          <Route exact path="/labor_protection/siz/ppe_issuance_card" element={<MainLaborProtection><PpeIssuanceCard/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/71" element={<MainLaborProtection><PurchaseRequestMessage/></MainLaborProtection>} />
          <Route exact path="/labor_protection/siz/ppe_allowance" element={<MainLaborProtection><PpeAllowance/></MainLaborProtection>} />
          <Route exact path="/labor_protection/siz/ppe_reviews" element={<MainLaborProtection><PpeReviews/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/45" element={<MainLaborProtection><PpeAllowanceList/></MainLaborProtection>} />
          <Route exact path="/labor/siz/reviews/get/:id" element={<MainLaborProtection><PpeReviewsRead/></MainLaborProtection>} />
          <Route exact path="/labor/siz/edit/:id" element={<MainLaborProtection><PpeReviewsEdit/></MainLaborProtection>} />
          <Route exact path="/labor/siz/allowance/get/:id" element={<MainLaborProtection><PpeAllowanceRead/></MainLaborProtection>} />
          <Route exact path="/labor/siz/allowance/edit/:id" element={<MainLaborProtection><PpeAllowanceEdit/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/44" element={<MainLaborProtection><PpeIssuanceList/></MainLaborProtection>} />
          <Route exact path="/labor/siz/issuance/get/:id" element={<MainLaborProtection><PpeIssuanceRead/></MainLaborProtection>} />
          <Route exact path="/labor/siz/issuance/edit/:id" element={<MainLaborProtection><PpeIssuanceEdit/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/47" element={<MainLaborProtection><PnbrList/></MainLaborProtection>} />
          <Route exact path="/labor_protection/pnbr" element={<MainLaborProtection><Pnbr/></MainLaborProtection>} />
          <Route exact path="/labor_protection/pnbr_card" element={<MainLaborProtection><PnbrCard/></MainLaborProtection>} />
          <Route exact path="/labor_protection/pnbv_card" element={<MainLaborProtection><PnbvCard/></MainLaborProtection>} />
        </Routes>
      </Router>
    );
  } else {
    return (
      <Authorization />
    )
  }
}

export default App;
