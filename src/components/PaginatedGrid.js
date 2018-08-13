import { isFunction, isString, isObject, has, orderBy } from 'lodash'
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
//import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';


class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, display } = this.props;
    let rows = [];
    for(let key in display){
      let item = display[key];
      if( isString(item)){
        rows.push({id:key, numeric:false, label:item});
      } else if (isObject(item)) {
        let label = has(item, 'th')? item['th'] : '';
        let numeric = has(item, 'numeric')? item['numeric'] : false;
        rows.push({id:key, numeric, label});
      }
    }

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding="default"
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  //display: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: '',
    page: 0,
    rowsPerPage: 10,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  renderRow = () => {

  }

  renderTableData = (data) => {
    const context = this;
    const { order, rowsPerPage, page } = this.state;
    const col = this.state.orderBy;
    if(col!==''){
      data = orderBy(data, [col], [order]);
    }
    return data
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row, index) => {
        let arrCols = [], c=0;
        for(let key in this.props.display){
          let config = this.props.display[key];
          try {
            if( isString(config)){
              arrCols.push(<TableCell key={c++}>{row[key]}</TableCell>)
            }
            if(isObject(config) && has(config,'td') && isFunction(config['td'])){
              arrCols.push(<TableCell key={c++}>{config.td(row, index, context)}</TableCell>);
            }
          } catch(error) {
            arrCols.push(<TableCell key={c++}>Error</TableCell>);
            console.log(`<PaginatedGrid> Error on field ${key}.`, error.toString(), row);
          }
        }
        return (
          <TableRow key={index}>{arrCols}</TableRow>
        );
      });
      /*
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
      if(emptyRows){
        const colSpan = Object.keys(this.props.display);
        retval.push(
          <TableRow key={this.state.rowsPerPage} style={{ height: 49 * emptyRows }}>
            <TableCell colSpan={colSpan} />
          </TableRow>
        )
      }
      return retval;
      */
  }

  render() {
    const { classes, display, data } = this.props;
    const { order, orderBy, rowsPerPage, page } = this.state;
    const htmlTableBody = this.renderTableData(data);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              display={display}
            />
            <TableBody>
              {htmlTableBody}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
