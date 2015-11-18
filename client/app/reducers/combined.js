import user from './user'
import skillsReport from './skills_report'
import skillDetails from './skill_details'
import skills from './skills'
import entities from './entities'

import { combineReducers } from 'redux';

const reducers = combineReducers({user, skillsReport, skillDetails, skills, entities})

export default reducers
