import * as http from 'http';
import * as Q from 'q';

export function downloadTextFile(url: string): Q.Promise<string> {
        let body = '';
        const deferred = Q.defer<string>();
         http.get(url, (res) => {
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            deferred.resolve(body);
        });
        res.resume();
    });
    return deferred.promise;
}