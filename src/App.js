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
import PnbrList from './pages/labor_protection/pnb/pnbr/PnbStatList'
import Pnbr from './pages/labor_protection/pnb/pnbr/PnbStatistics'
import PnbrCard from './pages/labor_protection/pnb/pnbrCard/PnbrCard'
import PnbvCard from './pages/labor_protection/pnb/pnbvCard/PnbvCard'
import ScheduleYear from './pages/labor_protection/pnb/schedule/ScheduleYear'
import ScheduleMonth from './pages/labor_protection/pnb/schedule/ScheduleMonth'
import ScheduleWeek from './pages/labor_protection/pnb/schedule/ScheduleWeek';
import ScheduleYearFolders from './pages/labor_protection/pnb/schedule/ScheduleYearFolders';
import PnbStatistics from './pages/labor_protection/pnb/pnbr/PnbStatistics';
import PnbStatList from './pages/labor_protection/pnb/pnbr/PnbStatList';
import PnbStatisticsRead from './pages/labor_protection/pnb/pnbr/PnbStatisticsRead';
import PnbrCardList from './pages/labor_protection/pnb/pnbrCard/PnbrCardList';
import PnbvCardList from './pages/labor_protection/pnb/pnbvCard/PnbvCardList';
import FactLoggingYear from './pages/labor_protection/pnb/fact_logging/FactLoggingYear';
import FactLoggingMonth from './pages/labor_protection/pnb/fact_logging/FactLoggingMonth';
import FactLoggingWeek from './pages/labor_protection/pnb/fact_logging/FactLoggingWeek';
import PnbvScheduleYear from './pages/labor_protection/pnb/schedule/PnbvScheduleYear';
import PnbvScheduleMonth from './pages/labor_protection/pnb/schedule/PnbvScheduleMonth';
import PnbvScheduleWeek from './pages/labor_protection/pnb/schedule/PnbvScheduleWeek';
import PnbvFactLoggingYear from './pages/labor_protection/pnb/fact_logging/PnbvFactLoggingYear';
import PnbvFactLoggingMonth from './pages/labor_protection/pnb/fact_logging/PnbvFactLoggingMonth';
import PnbvFactLoggingWeek from './pages/labor_protection/pnb/fact_logging/PnbvFactLoggingWeek';
import TransportAccidentsCreate from './pages/labor_protection/transport/TransportAccidentsCreate';
import TransportTrafficViolationCreate from './pages/labor_protection/transport/TransportTrafficViolationCreate';
import TransportTrafficViolationEdit from './pages/labor_protection/transport/TransportTrafficViolationEdit';
import TransportAccidentsList from './pages/labor_protection/transport/TransportAccidentsList';
import TransportAccidentsRead from './pages/labor_protection/transport/TransportAccidentsRead';
import TransportTrafficViolationRead from './pages/labor_protection/transport/TransportTrafficViolationRead';
import TransportAccidentsEdit from './pages/labor_protection/transport/TransportAccidentsEdit';
import TransportTrafficList from './pages/labor_protection/transport/TransportTrafficList';
import TransportFuelConsumption from './pages/labor_protection/transport/TransportFuelConsumption';
import TransportList from './pages/labor_protection/transport/TransportList';
import ContractorCard from './pages/labor_protection/contractorManagement/ContractorCard';
import ContractorList from './pages/labor_protection/contractorManagement/ContractorList';
import ContractorCardRead from './pages/labor_protection/contractorManagement/ContractorCardRead';
import ContractorCardEdit from './pages/labor_protection/contractorManagement/ContractorCardEdit';
import ResponsibilityOrder from './pages/labor_protection/contractorManagement/responsibilityOrder/ResponsibilityOrderCreate';
import ResponsibilityOrderRead from './pages/labor_protection/contractorManagement/responsibilityOrder/ResponsibilityOrderRead';
import ResponsibilityOrderEdit from './pages/labor_protection/contractorManagement/responsibilityOrder/ResponsibilityOrderEdit';
import ResponsibilityOrderList from './pages/labor_protection/contractorManagement/responsibilityOrder/ResponsibilityOrderList';
import PnbrCardRead from './pages/labor_protection/pnb/pnbrCard/PnbrCardRead';
import PnbvCardRead from './pages/labor_protection/pnb/pnbvCard/PnbvCardRead';
import EmployeeCard from './pages/labor_protection/employeeCard/EmployeeCard';
import EmployeeCardRead from './pages/labor_protection/employeeCard/EmployeeCardRead';
import EmployeeCardList from './pages/labor_protection/employeeCard/EmployeeCardList';
import EmployeeCardEdit from './pages/labor_protection/employeeCard/EmployeeCardEdit';
import MedExamination from './pages/labor_protection/medExamination/MedExamination';
import MedExaminationRead from './pages/labor_protection/medExamination/MedExaminationRead';
import MedExaminationList from './pages/labor_protection/medExamination/MedExaminationList';
import MedExaminationEdit from './pages/labor_protection/medExamination/MedExaminationEdit';
import WorkingConditions from './pages/labor_protection/workingConditions/workingConditions'
import WorkPermission from './pages/labor_protection/workPermission/WorkPermission'
import WorkPermissionList from './pages/labor_protection/workPermission/WorkPermissionList'
import WorkPermissionRead from './pages/labor_protection/workPermission/WorkPermissionRead'
import WorkPermissionEdit from './pages/labor_protection/workPermission/WorkPermissionEdit'

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
          <Route exact path="/labor_protection/list/57" element={<MainLaborProtection><PnbStatList/></MainLaborProtection>} />
          <Route exact path="/labor_protection/pnb_statistics" element={<MainLaborProtection><PnbStatistics/></MainLaborProtection>} />
          <Route exact path="/labor_protection/pnbr_card" element={<MainLaborProtection><PnbrCard/></MainLaborProtection>} />
          <Route exact path="/labor_protection/pnbv_card" element={<MainLaborProtection><PnbvCard/></MainLaborProtection>} />
          <Route exact path="/labor_protection/pnb_schedule_year" element={<MainLaborProtection><ScheduleYear/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/50" element={<MainLaborProtection><ScheduleYearFolders/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/51" element={<MainLaborProtection><ScheduleYearFolders/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/49" element={<MainLaborProtection><ScheduleYearFolders/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/53" element={<MainLaborProtection><ScheduleYearFolders/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/54" element={<MainLaborProtection><ScheduleYearFolders/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/55" element={<MainLaborProtection><ScheduleYearFolders/></MainLaborProtection>} />
          <Route exact path="/labor/pnb/get/:id" element={<MainLaborProtection><PnbStatisticsRead/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/47" element={<MainLaborProtection><PnbrCardList/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/48" element={<MainLaborProtection><PnbvCardList/></MainLaborProtection>} />
          <Route exact path="/labor_protection/pnb_schedule_month" element={<MainLaborProtection><ScheduleMonth/></MainLaborProtection>} />
          <Route exact path="/labor_protection/pnb_schedule_week" element={<MainLaborProtection><ScheduleWeek/></MainLaborProtection>} />
          <Route exact path="/labor_protection/pnb_fact_year" element={<MainLaborProtection><FactLoggingYear/></MainLaborProtection>} />
          <Route exact path="/labor_protection/pnb_fact_month" element={<MainLaborProtection><FactLoggingMonth/></MainLaborProtection>} />
          <Route exact path="/labor_protection/pnb_fact_week" element={<MainLaborProtection><FactLoggingWeek/></MainLaborProtection>} />
          <Route exact path="/labor_protection/pnbv_schedule_year" element={<MainLaborProtection><PnbvScheduleYear/></MainLaborProtection>} />
          <Route exact path="/labor_protection/pnbv_schedule_month" element={<MainLaborProtection><PnbvScheduleMonth/></MainLaborProtection>} />
          <Route exact path="/labor_protection/pnbv_schedule_week" element={<MainLaborProtection><PnbvScheduleWeek/></MainLaborProtection>} />
          <Route exact path="/labor_protection/pnbv_fact_year" element={<MainLaborProtection><PnbvFactLoggingYear/></MainLaborProtection>} />
          <Route exact path="/labor_protection/pnbv_fact_month" element={<MainLaborProtection><PnbvFactLoggingMonth/></MainLaborProtection>} />
          <Route exact path="/labor_protection/pnbv_fact_week" element={<MainLaborProtection><PnbvFactLoggingWeek/></MainLaborProtection>} />
          <Route exact path="/labor_protection/transport_accidents" element={<MainLaborProtection><TransportAccidentsCreate/></MainLaborProtection>} />
          <Route exact path="/labor_protection/transport_traffic_violation" element={<MainLaborProtection><TransportTrafficViolationCreate/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/61" element={<MainLaborProtection><TransportAccidentsList/></MainLaborProtection>} />
          <Route exact path="/labor/transport/accidents/get/:id" element={<MainLaborProtection><TransportAccidentsRead/></MainLaborProtection>} />
          <Route exact path="/labor/transport/accidents/edit/:id" element={<MainLaborProtection><TransportAccidentsEdit/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/60" element={<MainLaborProtection><TransportTrafficList/></MainLaborProtection>} />
          <Route exact path="/labor/transport/traffic/get/:id" element={<MainLaborProtection><TransportTrafficViolationRead/></MainLaborProtection>} />
          <Route exact path="/labor/transport/traffic/edit/:id" element={<MainLaborProtection><TransportTrafficViolationEdit/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/63" element={<MainLaborProtection><TransportFuelConsumption/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/62" element={<MainLaborProtection><TransportList/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/69" element={<MainLaborProtection><ContractorList/></MainLaborProtection>} />
          <Route exact path="/labor/pnb/pnbr_card/get/:id" element={<MainLaborProtection><PnbrCardRead/></MainLaborProtection>} />
          <Route exact path="/labor/pnb/pnbv_card/get/:id" element={<MainLaborProtection><PnbvCardRead/></MainLaborProtection>} />
          <Route exact path="/labor/contractors/cards/get/:id" element={<MainLaborProtection><ContractorCardRead/></MainLaborProtection>} />
          <Route exact path="/labor/contractors/cards/edit/:id" element={<MainLaborProtection><ContractorCardEdit/></MainLaborProtection>} />
          <Route exact path="/labor/contractors/cards" element={<MainLaborProtection><ContractorCard/></MainLaborProtection>} />
          <Route exact path="/labor/contractors/responsibility_order" element={<MainLaborProtection><ResponsibilityOrder/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/70" element={<MainLaborProtection><ResponsibilityOrderList/></MainLaborProtection>} />
          <Route exact path="/labor/contractors/orders/get/:id" element={<MainLaborProtection><ResponsibilityOrderRead/></MainLaborProtection>} />
          <Route exact path="/labor/contractors/orders/edit/:id" element={<MainLaborProtection><ResponsibilityOrderEdit/></MainLaborProtection>} />
          <Route exact path="/labor/employees/cards" element={<MainLaborProtection><EmployeeCard/></MainLaborProtection>} />
          <Route exact path="/labor/employees/cards/get/:id" element={<MainLaborProtection><EmployeeCardRead/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/65" element={<MainLaborProtection><EmployeeCardList/></MainLaborProtection>} />
          <Route exact path="/labor/employees/cards/edit/:id" element={<MainLaborProtection><EmployeeCardEdit/></MainLaborProtection>} />
          <Route exact path="/labor/employees/med_examination" element={<MainLaborProtection><MedExamination/></MainLaborProtection>} />
          <Route exact path="/labor/employees/med_examination/get/:id" element={<MainLaborProtection><MedExaminationRead/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/66" element={<MainLaborProtection><MedExaminationList/></MainLaborProtection>} />
          <Route exact path="/labor/employees/med_examination/edit/:id" element={<MainLaborProtection><MedExaminationEdit/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/67" element={<MainLaborProtection><WorkingConditions/></MainLaborProtection>} />
          <Route exact path="/labor_protection/work_permission/" element={<MainLaborProtection><WorkPermission/></MainLaborProtection>} />
          <Route exact path="/labor_protection/list/46" element={<MainLaborProtection><WorkPermissionList/></MainLaborProtection>} />
          <Route exact path="/labor/work_permission/get/:id" element={<MainLaborProtection><WorkPermissionRead/></MainLaborProtection>} />
          <Route exact path="/labor/work_permission/edit/:id" element={<MainLaborProtection><WorkPermissionEdit/></MainLaborProtection>} />
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
