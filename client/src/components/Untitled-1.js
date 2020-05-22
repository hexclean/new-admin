

Nagy Ervin  8:57 PM
Untitled 
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import HerosLoader from 'components/Loader/HerosLoader';
import DefaultHeader from 'components/common/DefaultHeader';
import Filter from 'components/Hero/Filter';
import BlankRow from 'components/common/BlankRow';
import { getData } from 'api';
import Item from './Item';
​
const PER_PAGE = 32;
​
const List = ({ t }) => {
	const [heroes, setHeroes] = useState([]);
	const [page, setPage] = useState(1);
	const [filter, setFilter] = useState('');
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);
​
	useEffect(() => {
		setLoading(true);
		setHeroes([]);
		getData(`heroes/${page}${filter}`, false)
			.then((response) => {
				if (response.heroes) {
					setHeroes(response.heroes);
					setTotal(response.total);
				}
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
			});
		window.scrollTo(0, 0);
	}, [page, filter]);
​
	const getHeroes = () => {
		const heroesList = [];
		heroes.map((hero, index) => heroesList.push(<Item index={index} key={hero.id} hero={hero} />));
		return heroesList;
	};
​
	const filterHeroes = (filterQuery) => {
		console.log('filterQuery', filterQuery);
		const query = `?category=${filterQuery.category}&keyword=${filterQuery.keyword}`;
		setPage(1);
		setFilter(query);
	};
​
	return (
		<React.Fragment>
			<DefaultHeader text={t('find_freelancer')} />
			<BlankRow height='20px' />
			<Container className='mb-75'>
				<Filter filterHeroes={filterHeroes} total={total} />
				{loading && (
					<Row>
						<HerosLoader />
					</Row>
				)}
				<BlankRow height='3px' />
				<Row>{heroes && getHeroes()}</Row>
				<Row>
					<Col>
						{!loading && !heroes.length && <h5 className='text-center mt-50'>{t('no_data_found')}</h5>}
					</Col>
				</Row>
				{heroes.length > 0 && total > PER_PAGE ? (
					<Row>
						<Col className='mt-50 justify-content-center'>
							<Pagination
								innerClass='pagination justify-content-center'
								itemClass='page-item'
								linkClass='page-link'
								activePage={page}
								itemsCountPerPage={PER_PAGE}
								totalItemsCount={total}
								pageRangeDisplayed={4}
								onChange={(pageNumber) => setPage(pageNumber)}
							/>
						</Col>
					</Row>
				) : null}
			</Container>
		</React.Fragment>
	);
};
​
export default withNamespaces()(List);
List.propTypes = {
	t: PropTypes.func.isRequired,
};