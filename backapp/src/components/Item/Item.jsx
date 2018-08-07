import React from 'react';
import './Item.css';

const Item = (props) => {

	const {config} = props;

	return (
		<div className="item column is-3">
			<div className="card">

				<div className="card-image">
					<figure className="image is-4by3">
					<img src={config.img} />
					</figure>
				</div>

				<p class="buttons" style={{
					margin: '15px 0 -10px 23px'
					}}>
					<a class="button is-small">
						<span class="icon is-small">
						<i class="fas fa-eye"></i>
						</span>
					</a>
					<a class="button  is-small">
						<span class="icon is-small">
						<i class="fas fa-thumbtack"></i>
						</span>
					</a>
					<button class="button is-danger is-small">
						<span class="icon is-small is-danger">
						<i class="fas fa-trash"></i>
						</span>
					</button>
				</p>

				<div className="card-content">
					<div className="media">
					<div className="media-content">
						<p className="title is-4">{config.title}</p>
						<p className="text-muted">{config.price.replace('.', ' ')} р.</p>
						<p className="">{config.price_sale.replace('.', ' ')} р.</p>
					</div>
					</div>

					<div className="content">
						<br />
						<a href={config.url} className="button is-small">
							<span className="icon is-small">
							<i className="fas fa-link"></i>
							</span>
							<span>В магазин</span>
						</a>
					</div>
					
				</div>
				</div>
		</div>
	);
};

export default Item;