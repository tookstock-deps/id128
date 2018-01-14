'use strict';

const _id = Symbol('id');
const _canonical_coder = Symbol('canonical_coder');
const _max = Symbol('max');
const _min = Symbol('min');
const _raw_coder = Symbol('raw_coder');

class IdFactory {
	constructor({
		id,
		canonical_coder,
		raw_coder,
	} = {}) {
		const factory = this;
		this[_id] = class extends id {
			static get [Symbol.species]() { return id; }
			get [Symbol.toStringTag]() { return `${id.name} ${this.toRaw()}`; }
			toCanonical() { return factory.toCanonical(this); }
			toRaw() { return factory.toRaw(this); }
		};
		this[_canonical_coder] = canonical_coder;
		this[_raw_coder] = raw_coder;
	}

	//Generators

	generate() {
		return this[_id].generate(...arguments);
	}

	MIN() {
		return this[_min] = this[_min] || this[_id].MIN();
	}

	MAX() {
		return this[_max] = this[_max] || this[_id].MAX();
	}

	// Coders

	fromCanonical(canonical) {
		return  new this[_id](this[_canonical_coder].decode(canonical));
	}

	fromRaw(raw) {
		return  new this[_id](this[_raw_coder].decode(raw));
	}

	toCanonical(id) {
		return this[_canonical_coder].encode(id.bytes);
	}

	toRaw(id) {
		return this[_raw_coder].encode(id.bytes);
	}

	// Comparators

	compare(lhs, rhs) {
		return lhs.compare(rhs);
	}

	equal(lhs, rhs) {
		return lhs.equal(rhs);
	}
}

module.exports = { IdFactory };
