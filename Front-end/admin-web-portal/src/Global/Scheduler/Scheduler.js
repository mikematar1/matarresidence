import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import {
	ViewState,
	IntegratedEditing,
	EditingState,
} from "@devexpress/dx-react-scheduler";
import {
	Scheduler,
	Appointments,
	AppointmentTooltip,
	DayView,
	WeekView,
	ViewSwitcher,
	DragDropProvider,
	AppointmentForm,
	Toolbar,
	DateNavigator,
	TodayButton,
	CurrentTimeIndicator,
} from "@devexpress/dx-react-scheduler-material-ui";
import Grid from "@mui/material/Grid";

// React Query
import { useQuery } from "@tanstack/react-query";

// API
import AddTask from "../../api-client/Scheduler/AddTask";
import FetchTasks from "../../api-client/Scheduler/FetchTasks";
import EditTask from "../../api-client/Scheduler/EditTask";
import DeleteTask from "../../api-client/Scheduler/DeleteTask";

const date = new Date();
const current = `${date.getFullYear()}-${
	date.getMonth() + 1
}-${date.getDate()}`;

const formattedDate = (date) => {
	const parsedDate = new Date(date);
	const year = parsedDate.getFullYear();
	const month =
		parsedDate.getMonth() + 1 < 10
			? `0${parsedDate.getMonth() + 1}`
			: parsedDate.getMonth() + 1;
	const day =
		parsedDate.getDate() < 10
			? `0${parsedDate.getDate()}`
			: parsedDate.getDate();
	const hour =
		parsedDate.getHours() < 10
			? `0${parsedDate.getHours()}`
			: parsedDate.getHours();
	const minute =
		parsedDate.getMinutes() < 10
			? `0${parsedDate.getMinutes()}`
			: parsedDate.getMinutes();
	const second =
		parsedDate.getSeconds() < 10
			? `0${parsedDate.getSeconds()}`
			: parsedDate.getSeconds();
	const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
	return formattedDate;
};

const Calendar = () => {
	const [appointments, setAppointments] = useState([]);
	const [shadePreviousCells, setShadePreviousCells] = useState(true);
	const [shadePreviousAppointments, setShadePreviousAppointments] =
		useState(true);
	const [updateInterval, setUpdateInterval] = useState(10000);

	const {
		status,
		error,
		data: tasksData,
	} = useQuery(["tasks_data"], FetchTasks);
	useEffect(() => {
		if (tasksData) {
			if (tasksData.length > 0) {
				setAppointments(tasksData);
			} else {
				alert("No staff found");
			}
		}
	}, [tasksData, status]);

	const commitChanges = ({ added, changed, deleted }) => {
		let data = [...appointments];
		if (added) {
			added.startDate = formattedDate(added.startDate);
			added.endDate = formattedDate(added.endDate);
			const response = AddTask(added);
			response.then((res) => {
				if (res.message !== "successful") {
					alert("Something went wrong");
				}
			});
			const startingAddedId =
				data.length > 0 ? data[data.length - 1].id + 1 : 0;
			data = [...data, { id: startingAddedId, ...added }];
		}
		if (changed) {
			const taskid = Object.keys(changed)[0];
			changed[taskid].startDate = formattedDate(changed[taskid].startDate);
			changed[taskid].endDate = formattedDate(changed[taskid].endDate);
			changed[taskid].taskid = parseInt(taskid);
			const response = EditTask(changed[taskid]);
			response.then((res) => {
				if (res.message !== "task editted successfuly") {
					alert("Something went wrong");
				}
			});

			data = data.map((appointment) =>
				changed[appointment.id]
					? { ...appointment, ...changed[appointment.id] }
					: appointment,
			);
		}
		if (deleted !== undefined) {
			const response = DeleteTask(deleted);
			response.then((res) => {
				if (res.message !== "task removed successfuly") {
					alert("Something went wrong");
				}
			});
			data = data.filter((appointment) => appointment.id !== deleted);
		}
		setAppointments(data);
	};

	return (
		<React.Fragment>
			<Grid container paddingTop='1em' paddingLeft='1em'>
				<h2>Staff Schedule</h2>
			</Grid>
			<Paper>
				<Scheduler data={appointments} height={850}>
					<ViewState defaultCurrentDate={current} />
					<EditingState onCommitChanges={commitChanges} />

					<WeekView />
					<DayView />
					<Appointments />
					<IntegratedEditing />

					<Toolbar />
					<ViewSwitcher />
					<DateNavigator />
					<TodayButton />
					<AppointmentTooltip showOpenButton />
					<AppointmentForm />
					<DragDropProvider />
					<CurrentTimeIndicator
						shadePreviousCells={shadePreviousCells}
						shadePreviousAppointments={shadePreviousAppointments}
						updateInterval={updateInterval}
					/>
				</Scheduler>
			</Paper>
		</React.Fragment>
	);
};

export default Calendar;
