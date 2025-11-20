import type { GeoData } from './ip-geo'

export interface Visit {
	page: string
	visit_time: Date
	log_time: Date
	user_agent: string
	geo: Omit<GeoData, 'ip'>
}
