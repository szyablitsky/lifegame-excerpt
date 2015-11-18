import React from 'react'
import { connect } from 'react-redux'
// TODO: get rid of ReactTooltip for server side rendering
import ReactTooltip from 'react-tooltip'

function select(state) {
  return {
    currentExp: state.user.getIn(['experience', 'inCurrentLevel']),
    levelExp: state.user.getIn(['experience', 'forNextLevel']),
    totalExp: state.user.getIn(['experience', 'total']),
    level: state.user.get('level'),
    unlockPoints: state.user.getIn(['skillPoints', 'unlock']),
    reportPoints: state.user.getIn(['skillPoints', 'report'])
  }
}

const POINTS_TIP = 'Количество очков опыта:<br>на текущем уровне / для перехода на следующий уровень (всего)'

const REPORT_POINTS_TIP =
  'Ежедневные очки распределения для увеличения значения навыка.<br>Используйте их для того чтобы делиться своими достижениями в ленте.'

const UserStats = React.createClass({
  render() {
    const { currentExp, levelExp, totalExp, level, unlockPoints, reportPoints, images } = this.props
    const text = `${currentExp} / ${levelExp} (${totalExp})`
    const width = currentExp / levelExp * 250 + 'px'

    return (
      <div className='user-stats'>
        <div className='level'>lv {level}</div>
        <div className='expirience-progress-bar' data-multiline={true} data-tip={POINTS_TIP}>
          <div className='text'>{text}</div>
          <div className='experience-progress' style={{width}}>
            <div className='text'>{text}</div>
          </div>
        </div>
        <div className='skill-points' data-tip='Очки для открытия новых навыков'>
          <img src={images['skill/unlock.png']} />
          <div className='count'>{unlockPoints}</div>
        </div>
        <div className='skill-points' data-multiline={true} data-tip={REPORT_POINTS_TIP}>
          <img src={images['skill/report.png']} height={30} width={'auto'} />
          <div className='count'>{reportPoints}</div>
        </div>
        <ReactTooltip place='bottom' effect='solid' />
      </div>
    )
  }
})

export default connect(select)(UserStats);
