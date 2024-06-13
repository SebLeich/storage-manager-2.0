import { DownloadService } from './download.service';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator';

describe('DownloadService', () => {
	let spectator: SpectatorService<DownloadService>;
	const createService = createServiceFactory({
		service: DownloadService
	});

	beforeEach(() => spectator = createService());

	it('should create', () => {
		expect(spectator.service).toBeTruthy();
	});
});
