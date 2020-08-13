import React, { useEffect, useState } from 'react';
import { PageComponent } from '@doorward/ui/types';
import moment from 'moment';
import Layout, { LayoutFeatures } from '../Layout';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import WebComponent from '@doorward/ui/components/WebComponent';
import CreateElectionModal from '../../components/Modals/CreateElectionModal';
import useModal from '@doorward/ui/hooks/useModal';
import { ModalFeatures } from '@doorward/ui/components/Modal';
import useFormSubmit from '@doorward/ui/hooks/useFormSubmit';
import useAction from '@doorward/ui/hooks/useActions';
import { listElectionsAction } from '../../reducers/elections/actions';
import Table from '@doorward/ui/components/Table';
import Tools from '@doorward/common/utils/Tools';
import hdate from 'human-date';
import useAuth from '@doorward/ui/hooks/useAuth';
import useRoutes from '../../hooks/useRoutes';

const Elections: React.FunctionComponent<ElectionsProps> = (props): JSX.Element => {
  const { electionList: elections, createElection } = useSelector((state: State) => state.elections);
  const electionModal = useModal();
  const routes = useRoutes();
  const { isMember } = useAuth();
  useFormSubmit(createElection, electionModal.closeModal);
  const fetchElections = useAction(listElectionsAction);

  useEffect(() => {
    fetchElections();
  }, []);

  return (
    <Layout
      {...props}
      features={[
        LayoutFeatures.BACK_BUTTON,
        LayoutFeatures.BREAD_CRUMBS,
        LayoutFeatures.HEADER,
        !isMember() && LayoutFeatures.ACTION_BUTTON,
      ]}
      header="Elections"
      actionBtnProps={{
        text: 'Create Election',
        onClick: electionModal.openModal,
      }}
    >
      <CreateElectionModal
        features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.NEGATIVE_BUTTON]}
        onSubmit={electionModal.closeModal}
        loading={createElection.submitting}
        useModal={electionModal}
      />
      <WebComponent
        data={elections.data?.elections}
        loading={elections.fetching}
        icon="poll"
        emptyMessage="No elections have been created yet."
      >
        {elections => {
          return (
            <Table
              data={elections}
              onRowClick={row => {
                routes.navigate(routes.viewElection, { electionId: row.id });
              }}
              columns={{ title: 'Title', createdAt: 'Date Created', time: 'Time', createdBy: 'Created by' }}
              getCell={row => {
                const started = moment().isAfter(row.startDate);
                const ended = moment().isAfter(row.endDate);
                return {
                  createdAt: Tools.normalDateTime(row.createdAt),
                  time: started
                    ? (ended ? 'Ended ' : 'Ends ') + hdate.relativeTime(row.endDate)
                    : 'Starts ' + hdate.relativeTime(row.startDate),
                  createdBy: row.author.fullName,
                };
              }}
            />
          );
        }}
      </WebComponent>
    </Layout>
  );
};

export interface ElectionsProps extends PageComponent {}

export default Elections;
