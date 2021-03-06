import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Knight from './Knight';
import Square from './Square';
import {canMoveKnight, moveKnight} from "./Game";

export default class Board extends Component {
    renderSquare(i) {
        const x = i % 8;
        const y = Math.floor(i / 8);
        const black = (x + y) % 2 === 1;

        const [knightX, knightY] = this.props.knightPosition;
        const piece = (x === knightX && knightY === y) ? <Knight/> : null;

        return (
            <div key={i}
                 style={{
                     width: '12.5%',
                     height: '25px'
                 }}
                 onClick={() => this.handleSquareClick(x, y)}>
                <Square black={black}>
                    {piece}
                </Square>
            </div>
        );
    }

    handleSquareClick(toX, toY) {
        if (canMoveKnight(toX, toY)) {
            moveKnight(toX, toY);
        }
    }

    render() {
        const squares = [];
        for (let i = 0; i < 64; i++) {
            squares.push(this.renderSquare(i));
        }

        return (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap'
            }}>
                {squares}
            </div>
        );
    }
}

Board.propTypes = {
    knightPosition: PropTypes.arrayOf(
        PropTypes.number.isRequired
    ).isRequired
};